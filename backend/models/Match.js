const mongoose = require('mongoose');
const {Schema} =  mongoose;

const matchSchema = new Schema({
  _id: String,
  competition_id: String,
  team_1: String,
  team_2: String,
  date: Date,
  status: String
});

module.exports = mongoose.model('Match', matchSchema);
