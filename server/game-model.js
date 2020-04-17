const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const gameSchema = new Schema(
  {
    numberPlayers: { type: Number, required: true },
    timeLimit: { type: Number, required: true },
    admin: { type: String, required: true },
    players: { type: Array, required: true }
  },
);


const Game = mongoose.model('Game', gameSchema);
module.exports = Game;
