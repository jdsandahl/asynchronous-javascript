/**
 * @jest-environment node
 */

const request = require('supertest');
const nock = require('nock');
const app = require('../src/app');
const { jokesResponse, randomJokeResponse, personalJokeResponse } = require('../src/mockData');

describe('GET / - Homepage', () => {
it('should respond with some homepage markup', done => {
  request(app)
    .get('/')
    .then(res => {
      expect(res.statusCode).toEqual(200);
      expect(res.text).toContain('Hello, welcome to my jokes API!');
      done();
    });
});
});

describe('GET /jokes', () => {
  it('should serve a list of jokes', done => {
    const mockResponse = jokesResponse;

    nock('https://api.icndb.com')
      .get('/jokes')
      .reply(200, mockResponse);

    request(app)
      .get('/jokes')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.jokes).toEqual(mockResponse.value);
        done();
      });
  });

  it('should respond with an error message if something goes wrong', done => {
    nock('https://api.icndb.com')
      .get('/jokes')
      .replyWithError({ statusCode: 500, message: 'huge error' });

      request(app)
        .get('/jokes')
        .then(res => {
          expect(res.statusCode).toEqual(500);
          expect(res.body.error).toEqual('huge error');
          done();
      });
  });
});

describe ('GET /jokes/random', () => {
it('GET /jokes/random should serve one random joke', done => {
  const mockResponse = randomJokeResponse;

  nock('https://api.icndb.com')
    .get('/jokes/random')
    .query({ exclude: '[explicit]' })
    .reply(200, mockResponse);

  request(app)
    .get('/jokes/random')
    .then(res => {
      expect(res.statusCode).toEqual(200);
      expect(res.body.randomJoke).toEqual(mockResponse.value);
      done();
    });
});

it('should respond with an error message if something goes wrong', done => {
  nock('https://api.icndb.com')
    .get('/jokes/random')
    .query({ exclude: '[explicit]'})
    .replyWithError({ statusCode: 404, message: 'Unknown resource' });

    request(app)
      .get('/jokes/random')
      .then(res => {
        expect(res.statusCode).toEqual(404);
        expect(res.body.error).toEqual('Unknown resource');
        done();
    });
});
});

describe('GET /jokes/personal/:first/:last', () => {
it('should serve one random personalised joke', async () => {
  const mockResponse = personalJokeResponse;

  nock('https://api.icndb.com')
    .get('/jokes/random')
    .query({ exclude: '[explicit]', firstName: 'manchester', lastName: 'codes' })
    .reply(200, mockResponse);

  request(app)
    .get('/jokes/personal/manchester/codes')
    .then(res => {
      expect(res.statusCode).toEqual(200);
      expect(res.body.personalJoke).toEqual(mockResponse.value);
    });
});

it('should respond with an error message if something goes wrong', async () => {
  nock('https://api.icndb.com')
    .get('/jokes/random')
    .query({ exclude: '[explicit]', firstName: 'manchester', lastName: 'codes' })
    .replyWithError({ statusCode: 500, message: 'Bad request' });

    request(app)
      .get('/jokes/personal/manchester/codes')
      .then(res => {
        expect(res.statusCode).toEqual(500);
        expect(res.body.error).toEqual('Bad request');
    });
});
});