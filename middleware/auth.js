const jwt = require('jsonwebtoken');

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

function isAdmin(req, res, next) {
  isAuthenticated(req, res, () => {
    if (req.user.role === 'admin') {
      next();
    } else {
      res.redirect('/login');
    }
  });
}

function isHospital(req, res, next) {
  isAuthenticated(req, res, () => {
    if (req.user.role === 'hospital') {
      next();
    } else {
      res.redirect('/login');
    }
  });
}

module.exports = { isAdmin, isHospital, isAuthenticated };
