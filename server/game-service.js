const Game = require('./game-model');
const ReadPreference = require('mongodb').ReadPreference;
var mongoose = require('mongoose');

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

function ready(req, res) {
  req.socket.setTimeout(1700000000)
  const { id } = req.params
  const headers = {
    'Content-Type': 'text/event-stream;charset=utf-8',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache, no-transform'
  }
  res.writeHead(200, headers)
  const pipeline = [{$match: { 'documentKey._id': new mongoose.Types.ObjectId(id) }}]
  const options = {fullDocument: "updateLookup"}
  var cursor = Game.watch(pipeline, options)
  cursor.on('change', data => {
    res.write(`data: ${JSON.stringify(data.updateDescription.updatedFields)}\n\n`)
  })
}

module.exports = { get, create, adminGet, ready };
