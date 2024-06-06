const mongoose = require('mongoose');
const {Schema} =  mongoose;

const playerSchema = new Schema({
  _id: String,
  team_id: String,
  name: String,
  stats: {
    matches: Number,
    runs: Number,
    wickets: Number
  }
});

module.exports = mongoose.model('Player', playerSchema);
