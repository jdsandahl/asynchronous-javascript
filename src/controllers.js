exports.mainController = (req, res) => {
  res.send({
    message: 'Welcome to my jokes API!',
  });
}  

exports.allJokesController = (req, res) => {
  res.send({
    message: 'This is the all jokes endpoint',
  });
}

exports.randomJokeController = (req, res) => {
  res.send({
    message: 'This is the random joke endpoint',
  });
}

exports.personalJokeController = (req, res) => {
  res.send({
    message: 'This is the random personalised joke endpoint',
  });
}