const express = require('express');
const controllers = require('./controllers')

const app = express();

app.get('/', controllers.mainController);
app.get('/jokes', controllers.allJokesController);
app.get('/jokes/random', controllers.randomJokeController);
app.get('/jokes/random/:first/:name', controllers.personalJokeController);

module.exports = app;
