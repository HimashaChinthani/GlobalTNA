const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // Simple hardcoded check for testing
  if (username === 'admin' && password === 'password') {
    const token = jwt.sign(
      { username: 'admin', role: 'admin' }, 
      process.env.JWT_SECRET || 'test_secret_key',
      { expiresIn: '1h' }
    );
    return res.json({ token });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
});

module.exports = router;
