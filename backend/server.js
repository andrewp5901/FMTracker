const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const User = require('./models/User');
const bcrypt = require('bcrypt');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// Import routes
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('FMTracker API is running');
});

const API_KEY = process.env.LASTFM_API_KEY;
const requestUrl = "http://ws.audioscrobbler.com/2.0" + "?method=user.getrecenttracks&user=IAmNotJP&limit=10&api_key=" + API_KEY + "&format=json";

let songs = [];  // simple in-memory storage (for now)

app.get('/api/songs', async (req, res) => {
  res.json({ songlist: songs });
});

app.get('/api/lastfm', async (req, res) => {
  res.json({ api: requestUrl });
});

app.post('/api/register', async (req, res) => {
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

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful!' });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
