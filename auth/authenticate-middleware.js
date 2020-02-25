/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

module.exports = (req, res, next) => {

  const token = req.headers.authorization;

  if(!token) {
    res.status(401).json({ message: 'You shall not pass!' });
  } else {
    jwt.verify(token, secrets.jwtSecret, (err, decoded) => {
      console.log(decoded)
      if(err) {
        res.status(500).json({message: 'There was an error reading your token'});
      } else {
        next();
      }
    })
  }
};
