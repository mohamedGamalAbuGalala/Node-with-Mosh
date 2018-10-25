const jwt = require('jsonwebtoken');
const config = require('config');

module.exports.auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  // validate
  try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send('Access denied. Invalid token.');
  }
};
