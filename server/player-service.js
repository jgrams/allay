const Game = require('./game-model');
const ReadPreference = require('mongodb').ReadPreference;

require('./mongo').connect();

function get(req, res) {
  const { id, player } = req.params;
  Game
    .findOne({_id: id, "players.slug": player}, { "players.$": 1  })
    .read(ReadPreference.NEAREST)
    .then(player => {
      res.json(player);
    })
    .catch(err => {
      res.status(500).send(err);
    });
}

function name(req, res) {
  const { _id, player } = req.body;
  Game.findOne({ _id }, Game.hideAdminFields)
    .then(game => {
      var updatedPlayer = game.players.id(player._id);
      updatedPlayer.name = player.name;
      updatedPlayer.ready = true;
      game.save().then(() => {
        res.json(game)
      });
    })
    .catch(err => {
      res.status(500).send(err);
    });
}

module.exports = { get, name };