const jokesResponse = {
  type: 'success',
  value: [
    {
      id: 1,
      joke: 'i am a joke',
      categories: [],
    },
    {
      id: 2,
      joke: 'i am another joke',
      categories: [],
    },
  ],
};

const randomJokeResponse = {
  type: 'success',
  value: {
    id: 115,
    joke: 'i am a random joke',
    categories: [],
  },
};

const personalJokeResponse = {
  type: 'success',
  value: {
    id: 141,
    joke: 'random personal joke about manchester codes',
    categories: [],
  },
}

module.exports = { jokesResponse, randomJokeResponse, personalJokeResponse };
