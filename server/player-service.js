const Game = require('./game-model');
const ReadPreference = require('mongodb').ReadPreference;

require('./mongo').connect();

function get(req, res) {
  const { id, player } = req.params;
  Game
    .findOne({_id: id, "players.slug": player}, { "players.$": 1  })
    .read(ReadPreference.NEAREST)
    .then(game => {
      console.log(game)
      res.json(game);
    })
    .catch(err => {
      res.status(500).send(err);
    });
}


module.exports = { get };