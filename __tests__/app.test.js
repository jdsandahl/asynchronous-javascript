/**
 * @jest-environment node
 */

const request = require('supertest');
const nock = require('nock');
const app = require('../src/app');
const { jokesResponse, randomJokeResponse, personalJokeResponse } = require('../src/mockData');

describe('GET / - Homepage', () => {
  it('should respond with some homepage markup', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('Hello, welcome to my jokes API!');
  });
});

describe('GET /jokes', () => {
  it('should serve a list of jokes', async () => {
    const mockResponse = jokesResponse;

    nock('https://api.icndb.com')
      .get('/jokes')
      .reply(200, mockResponse);

    const res = await request(app).get('/jokes');
    expect(res.statusCode).toEqual(200);
    expect(res.body.jokes).toEqual(mockResponse.value);
  });

  it('should respond with an error message if something goes wrong', async () => {
    nock('https://api.icndb.com')
      .get('/jokes')
      .replyWithError({ statusCode: 500, message: 'huge error' });

    const res = await request(app).get('/jokes');
    expect(res.statusCode).toEqual(500);
    expect(res.body.error).toEqual('huge error');
  });
});

describe('GET /jokes/random', () => {
  it('GET /jokes/random should serve one random joke', async () => {
    const mockResponse = randomJokeResponse;

    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]' })
      .reply(200, mockResponse);

    const res = await request(app).get('/jokes/random');
    expect(res.statusCode).toEqual(200);
    expect(res.body.randomJoke).toEqual(mockResponse.value);
  });

  it('should respond with an error message if something goes wrong', async () => {
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]' })
      .replyWithError({ statusCode: 404, message: 'Unknown resource' });

    const res = await request(app).get('/jokes/random');
    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toEqual('Unknown resource');
  });
});

describe('GET /jokes/personal/:first/:last', () => {
  it('should serve one random personalised joke', async () => {
    const mockResponse = personalJokeResponse;

    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]', firstName: 'manchester', lastName: 'codes' })
      .reply(200, mockResponse);

    const res = await request(app).get('/jokes/personal/manchester/codes');
    expect(res.statusCode).toEqual(200);
    expect(res.body.personalJoke).toEqual(mockResponse.value);
  });

  it('should respond with an error message if something goes wrong', async () => {
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]', firstName: 'manchester', lastName: 'codes' })
      .replyWithError({ statusCode: 500, message: 'Bad request' });

    const res = await request(app).get('/jokes/personal/manchester/codes');
    expect(res.statusCode).toEqual(500);
    expect(res.body.error).toEqual('Bad request');
  });
});
