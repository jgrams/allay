const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
  player: String,
  answer: String,
  target: String,
}, { autoIndex: false });

const turnSchema = new Schema({
  number:  { type: Number, default: 0, index: true },
  question: String,
  answers: [answerSchema]
});

const slugSchema = new Schema({
  slug: { type: String, required: true },
})

const playerSchema = new Schema({
  slug: { type: String, required: true },
  name: { type: String, default: ''},
  points: { type: Number, default: 0 },
  ready: { type: Boolean, default: false }
});

const gameSchema = new Schema({
    numberPlayers: { type: Number, required: true, min: 2, max: 100 },
    timeLimit: { type: Number, required: true },
    admin: { type: String, required: true },
    round: { type: Number, default: 0, required: true },
    players: [playerSchema],
    turn: turnSchema,
    turnHistory: [turnSchema]
});

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;
