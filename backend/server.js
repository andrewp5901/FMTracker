const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');


dotenv.config(); // Load API key securely
const API_KEY = process.env.LASTFM_API_KEY;
const MONGO_URI = process.env.MONGO_URI;

// Initialize express
const app = express();
const PORT = process.env.PORT || 3000;
const request = "http://ws.audioscrobbler.com/2.0" + "?method=user.getrecenttracks&user=IAmNotJP&limit=10&api_key="+API_KEY+"&format=json"

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
app.get('/api/songs', async (req, res) => {
  res.json({ api: request});
});
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