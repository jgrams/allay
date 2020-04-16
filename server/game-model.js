const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const gameSchema = new Schema(
  {
    players: { type: Number, required: true },
    time_limit: { type: String, required: false },
    admin: { type: String, required: true },
    page: { type: String, required: true },
  },
  { autoIndex: false }
);

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;
