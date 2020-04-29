const express = require('express');
const {mainController, allJokesController, randomJokeController, personalJokeController} = require('./controllers')

const app = express();

app.get('/', mainController);
app.get('/jokes', allJokesController);
app.get('/jokes/random', randomJokeController);
app.get('/jokes/random/:first/:name', personalJokeController);

module.exports = app;
