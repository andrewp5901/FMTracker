const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // Load API key securely
const API_KEY = process.env.LASTFM_API_KEY;

// Initialize express
const app = express();
const PORT = process.env.PORT || 5000;

// Initalize cors
app.use(cors());
app.use(express.json());

app.get('/api/ping', (req, res) => {
    res.json({ message: "Server is connected to Angular"})
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});