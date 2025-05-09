const mongoose = require('mongoose');

const userStatsSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
    unique: true
  },
  totalListeningTime: {
    type: Number,
    default: 0
  },
  likedSongs: [
    {
      songName: String,
      artist: String
    }
  ]
});

module.exports = mongoose.model('UserStats', userStatsSchema);
