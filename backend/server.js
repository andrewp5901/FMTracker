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

// Initalize cors
app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/api/ping', (req, res) => {
    res.json({ message: "Server is connected to Angular"})
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});