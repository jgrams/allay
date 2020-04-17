const Game = require('./game-model');
const ReadPreference = require('mongodb').ReadPreference;

require('./mongo').connect();

function get(req, res) {
  const { id } = req.params;
  Game
    .findOne({_id: id})
    .read(ReadPreference.NEAREST)
    .then(game => {
      res.json(game);
    })
    .catch(err => {
      res.status(500).send(err);
    });
}

function adminGet(req, res) {
  const { id, admin } = req.params;
  Game
    .findOne({_id: id, admin: admin})
    .read(ReadPreference.NEAREST)
    .then(game => {
      res.json(game);
    })
    .catch(err => {
      res.status(500).send(err);
    });
}

function create(req, res) {
  const { numberPlayers, timeLimit } = req.body;
  const players = new Array();
  for (var i = numberPlayers - 1; i > 0; i--) {
    players.push({ id: i, name: '', slug: Math.random().toString(36).substring(2, 6)})
  }
  console.log(players);
  const game = new Game({ numberPlayers, 
                          timeLimit, 
                          admin: Math.random().toString(36).substring(2, 15),
                          players: players });
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
  const { _id, admin, numberPlayers, timeLimit } = req.body;

  Game.findOne({ _id, admin })
    .then(game => {
      game.numberPlayers = numberPlayers;
      game.timeLimit = timeLimit;
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

module.exports = { get, create, update, destroy, adminGet };
