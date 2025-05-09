const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('MongoDB connection error:', err));

// Import routes
const userRoutes = require('./routes/users');

// Use routes
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('FMTracker API is running');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
