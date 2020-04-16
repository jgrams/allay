const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const gameSchema = new Schema(
  {
    numberPlayers: { type: Number, required: true },
    timeLimit: { type: Number, required: false },
    page: { type: String, required: true },
    admin: { type: String, required: true },
    players: { 
      slug: String,


    }
  },
  { autoIndex: false }
);

gameSchema.methods.createSlugs = function () {
  console.log('TODO MAKE SLUGS');
}

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;
