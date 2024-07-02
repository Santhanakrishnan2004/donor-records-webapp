const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Login
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  const { username, password, role } = req.body;
  const user = await User.findOne({ username, role });
  if (!user) {
    return res.redirect('/login');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.redirect('/login');
  }
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true });
  if (user.role === 'admin') {
    res.redirect('/admin/dashboard');
  } else {
    res.redirect('/hospital/dashboard');
  }
});

// Logout
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
});

module.exports = router;
