const mongoose = require('mongoose');
const {Schema} =  mongoose;

const teamSchema = new Schema({
  competition_id: String,
  team_name: String,
  matchId:String,
  players: [String],
  user: {type:Schema.Types.ObjectId, ref:'User'}
});

module.exports = mongoose.model('Team', teamSchema);

