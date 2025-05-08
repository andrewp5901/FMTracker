const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');


dotenv.config(); // Load API key securely
const API_KEY = process.env.LASTFM_API_KEY;
const MONGO_URI = process.env.MONGO_URI;

// Initialize express
const app = express();
const PORT = process.env.PORT || 5000;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const axios = require('axios');
const UserStats = require('./models/UserStats');


// Initalize cors
app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Test Route
app.get('/', (req, res) => {
    res.send('Server connected to Angular.');
});

// Get Songs need to setup Song model and mangoDb logic
// app.get('/api/songs', async (req, res) => {
//     try {
//         const songs = await Song.find();
//         res.json(songs);
//     } catch (err) {
//         res.json({ error: 'Failed to fetch songs' });
//     }
// });

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

app.post('/api/register', async (req, res) => {
  try {
      const { name, email, password } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const newUser = new User({
          name,
          email,
          password: hashedPassword
      });

      await newUser.save();

      res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
      const { email, password } = req.body;

      // Find user
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Create JWT
      const token = jwt.sign(
          { userId: user._id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
      );

      res.json({ token, message: 'Login successful' });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/nowplaying', async (req, res) => {
    try {
      const username = 'rj'; // using public Last.fm username for testing
      const apiKey = process.env.LASTFM_API_KEY;
  
      const response = await axios.get(
        `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`
      );
  
      const track = response.data.recenttracks.track[0];
      res.json({
        artist: track.artist['#text'],
        title: track.name,
        nowPlaying: track['@attr']?.nowplaying === 'true'
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to fetch now playing track' });
    }
  });
  
  app.post('/api/userstats/updateTime', async (req, res) => {
    try {
      const { userEmail, duration } = req.body;
  
      let stats = await UserStats.findOne({ userEmail });
  
      if (!stats) {
        stats = new UserStats({
          userEmail,
          totalListeningTime: duration
        });
      } else {
        stats.totalListeningTime += duration;
      }
  
      await stats.save();
      res.json({ message: 'Listening time updated.', totalListeningTime: stats.totalListeningTime });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to update listening time.' });
    }
  });
  
  app.get('/api/userstats/:userEmail', async (req, res) => {
    try {
      const { userEmail } = req.params;
      const stats = await UserStats.findOne({ userEmail });
  
      if (!stats) {
        return res.json({ totalListeningTime: 0 });
      }
  
      res.json({ totalListeningTime: stats.totalListeningTime });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to fetch user stats.' });
    }
  });
  