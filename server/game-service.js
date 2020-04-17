const Game = require('./game-model');
const ReadPreference = require('mongodb').ReadPreference;

require('./mongo').connect();

function get(req, res) {
  const docquery = Game.find({}).read(ReadPreference.NEAREST);
  docquery
    .exec()
    .then(games => {
      res.json(games);
    })
    .catch(err => {
      res.status(500).send(err);
    });
}

function create(req, res) {
  const { numberPlayers, timeLimit } = req.body;
  const game = new Game({ numberPlayers, 
                          timeLimit, 
                          admin: Math.random().toString(36).substring(2, 15) });
  game
    .save()
    .then(() => {
      res.json(game);
    })
    .catch(err => {
      res.status(500).send(err);
    });
}

function update(req, res) {
  const { id, name, saying } = req.body;

  Game.findOne({ id })
    .then(game => {
      game.name = name;
      game.saying = saying;
      game.save().then(res.json(game));
    })
    .catch(err => {
      res.status(500).send(err);
    });
}

function destroy(req, res) {
  const { id } = req.params;

  Game.findOneAndRemove({ id })
    .then(game => {
      res.json(game);
    })
    .catch(err => {
      res.status(500).send(err);
    });
}

module.exports = { get, create, update, destroy };
