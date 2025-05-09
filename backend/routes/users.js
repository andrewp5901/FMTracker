const express = require('express');
const router = express.Router();
const User = require('../models/User');

// DELETE user by email
router.delete('/:email', async (req, res) => {
  const email = req.params.email;

  try {
    const deletedUser = await User.findOneAndDelete({ email: email });

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({ message: 'User account deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while deleting account.' });
  }
});

module.exports = router;
