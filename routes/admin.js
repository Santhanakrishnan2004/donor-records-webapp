// const express = require('express');
// const router = express.Router();
// const User = require('../models/user');
// const Patient = require('../models/patient');
// const Donor = require('../models/donor');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// // Middleware to check if admin
// function isAdmin(req, res, next) {
//     isAuthenticated(req, res, () => {
//       if (req.user.role === 'admin') {
//         next();
//       } else {
//         res.redirect('/login');
//       }
//     });
//   }
//   function isHospital(req, res, next) {
//     isAuthenticated(req, res, () => {
//       if (req.user.role === 'hospital') {
//         next();
//       } else {
//         res.redirect('/login');
//       }
//     });
//   }


//   function isAuthenticated(req, res, next) {
//     const token = req.cookies.token;
//     if (!token) {
//       return res.redirect('/login');
//     }
//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//       if (err) {
//         return res.redirect('/login');
//       }
//       req.user = decoded;
//       next();
//     });
//   }


// // Admin Dashboard
// router.get('/dashboard', isAdmin, async (req, res) => {
//     try {
//       const patients = await Patient.find({}).populate('createdBy');
//       res.render('admin/dashboard', { patients });
//     } catch (err) {
//       console.error(err);
//       res.redirect('/login');
//     }
//   });

// // Create new hospital account
// router.post('/create-hospital', isAdmin, async (req, res) => {
//   const { username, password } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);
//   const newUser = new User({ username, password: hashedPassword, role: 'hospital' });
//   await newUser.save();
//   res.redirect('/admin/dashboard');
// });

// // Accept patients
// router.post('/accept-patient/:id', isAdmin, async (req, res) => {
//   const patientId = req.params.id;
//   await Patient.findByIdAndUpdate(patientId, { status: 'approved' });
//   res.redirect('/admin/dashboard');
// });

// // Delete patient
// router.post('/delete-patient/:id', isAdmin, async (req, res) => {
//   const patientId = req.params.id;
//   await Patient.findByIdAndDelete(patientId);
//   res.redirect('/admin/dashboard');
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Patient = require('../models/patient');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { isAdmin, isAuthenticated } = require('../middleware/auth');

// Admin Dashboard
router.get('/dashboard', isAdmin, async (req, res) => {
  try {
    const patients = await Patient.find({}).populate('createdBy');
    res.render('admin/dashboard', { patients });
  } catch (err) {
    console.error(err);
    res.redirect('/login');
  }
});

// Create new hospital account
router.post('/create-hospital', isAdmin, async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword, role: 'hospital' });
  await newUser.save();
  res.redirect('/admin/dashboard');
});

// Accept patients
router.post('/accept-patient/:id', isAdmin, async (req, res) => {
  const patientId = req.params.id;
  await Patient.findByIdAndUpdate(patientId, { status: 'approved' });
  res.redirect('/admin/dashboard');
});

// Delete patient
router.post('/delete-patient/:id', isAdmin, async (req, res) => {
  const patientId = req.params.id;
  await Patient.findByIdAndDelete(patientId);
  res.redirect('/admin/dashboard');
});

module.exports = router;
