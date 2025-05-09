const express = require('express');
const router = express.Router();
const User = require('../models/User');
const UserStats = require('../models/UserStats');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    const newStats = new UserStats({
      userEmail: email,
      totalListeningTime: 0,
      likedSongs: []
    });
    await newStats.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// DELETE user by email
router.delete('/:email', async (req, res) => {
  const email = req.params.email;

  try {
    const deletedUser = await User.findOneAndDelete({ email: email });
    await UserStats.findOneAndDelete({ userEmail: email });

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({ message: 'User account deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while deleting account.' });
  }
});

// Get user stats by email
router.get('/:email/stats', async (req, res) => {
  const email = req.params.email;

  try {
    const stats = await UserStats.findOne({ userEmail: email });

    if (!stats) {
      return res.status(404).json({ message: 'No stats found for this user.' });
    }

    res.json(stats);
  } catch (err) {
    console.error('Error fetching stats:', err);
    res.status(500).json({ message: 'Server error fetching stats.' });
  }
});

router.post('/:email/listening-time', async (req, res) => {
  const email = req.params.email;
  const { duration } = req.body;

  try {
    let stats = await UserStats.findOne({ userEmail: email });
    if (!stats) {
      stats = new UserStats({ userEmail: email, totalListeningTime: duration });
    } else {
      stats.totalListeningTime += duration;
    }
    await stats.save();
    res.json({ message: 'Listening time updated', totalListeningTime: stats.totalListeningTime });
  } catch (err) {
    console.error('Error updating listening time:', err);
    res.status(500).json({ message: 'Failed to update listening time' });
  }
});

// NEW: Like a song
router.post('/:email/likes', async (req, res) => {
  const email = req.params.email;
  const { songName, artist } = req.body;

  try {
    let stats = await UserStats.findOne({ userEmail: email });
    if (!stats) {
      stats = new UserStats({ userEmail: email, totalListeningTime: 0, likedSongs: [] });
    }

    // Check if already liked
    const alreadyLiked = stats.likedSongs?.some(
      (s) => s.songName === songName && s.artist === artist
    );

    if (!alreadyLiked) {
      stats.likedSongs = stats.likedSongs || [];
      stats.likedSongs.push({ songName, artist });
      await stats.save();
      res.json({ message: 'Song liked successfully', likedSongs: stats.likedSongs });
    } else {
      res.status(200).json({ message: 'Song already liked', likedSongs: stats.likedSongs });
    }
  } catch (err) {
    console.error('Error liking song:', err);
    res.status(500).json({ message: 'Failed to like song' });
  }
});

module.exports = router;
