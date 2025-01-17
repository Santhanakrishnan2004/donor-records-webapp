// const express = require('express');
// const router = express.Router();
// const Patient = require('../models/patient');
// const Donor = require('../models/donor');
// const jwt = require('jsonwebtoken');
// function isAuthenticated(req, res, next) {
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
  
//   function isAdmin(req, res, next) {
//     isAuthenticated(req, res, () => {
//       if (req.user.role === 'admin') {
//         next();
//       } else {
//         res.redirect('/login');
//       }
//     });
//   }
// // Middleware to check if hospital
// function isHospital(req, res, next) {
//     isAuthenticated(req, res, () => {
//       if (req.user.role === 'hospital') {
//         next();
//       } else {
//         res.redirect('/login');
//       }
//     });
//   }

// // Hospital Dashboard
// router.get('/dashboard', isHospital, async (req, res) => {
//     try {
//       const patients = await Patient.find({ createdBy: req.user.id });
//       res.render('hospital/dashboard', { patients });
//     } catch (err) {
//       console.error(err);
//       res.redirect('/login');
//     }
//   });

// // Upload new patient
// router.post('/upload-patient', isHospital, async (req, res) => {
//   const { name, phone, bloodgroup,area } = req.body;
//   const newPatient = new Patient({ name, phone, area,bloodgroup, createdBy: req.user.id });
//   await newPatient.save();
//   res.redirect('/hospital/dashboard');
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const Patient = require('../models/patient');
const jwt = require('jsonwebtoken');
const { isHospital } = require('../middleware/auth');

// Middleware to check if authenticated and hospital
function isAuthenticated(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect('/login');
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.redirect('/login');
    }
    req.user = decoded;
    next();
  });
}

// Hospital Dashboard with Search Functionality
router.get('/dashboard', isHospital, async (req, res) => {
  try {
    let query = {};
    if (req.query.bloodgroup) {
      query.bloodgroup = req.query.bloodgroup;
    }
    if (req.query.area) {
      query.area = { $regex: new RegExp(req.query.area, 'i') }; // Case insensitive search
    }

    const patients = await Patient.find({ createdBy: req.user.id, ...query });
    res.render('hospital/dashboard', { patients });
  } catch (err) {
    console.error(err);
    res.redirect('/login');
  }
});

// Upload new patient
router.post('/upload-patient', isHospital, async (req, res) => {
  const { name, phone, bloodgroup, area } = req.body;
  const newPatient = new Patient({ name, phone, bloodgroup, area, createdBy: req.user.id });
  await newPatient.save();
  res.redirect('/hospital/dashboard');
});

module.exports = router;
