const Game = require('./game-model');
const ReadPreference = require('mongodb').ReadPreference;

require('./mongo').connect();

function get(req, res) {
  const { id, player } = req.params;
  Game
    .findOne({_id: id, "players.slug": player}, { "players.slug": 0, "admin": 0  })
    .read(ReadPreference.NEAREST)
    .then(game => {
      res.json(game);
    })
    .catch(err => {
      res.status(500).send(err);
    });
}

function adminGet(req, res) {
  const { id, player, admin } = req.params;
  Game
    .findOne({_id: id, admin: admin, "players.slug": player})
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
  const players = new Array; 
  for (var i = numberPlayers; i > 0; i--) {
    players.push({slug: Math.random().toString(36).substring(2, 8)})
  }
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

function setName(req, res) {
  const { _id, player, name } = req.body;

  Game.findOne({ _id, player }, { "players._id": 0, "admin": 0  })
    .then(game => {
      var player = game.players.id(player._id);
      player.name = name;
      game.save().then(res.json(game));
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

module.exports = { get, create, update, destroy, adminGet, setName };
