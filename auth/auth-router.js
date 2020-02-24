const router = require('express').Router();
const Users = require('./usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

router.post('/register', (req, res) => {
  // implement registration
  let {username, password} = req.body;

  if(username && password) {

    password = bcrypt.hashSync(password, 10);

    Users.addUser({username, password})
      .then(user => {
        [user] = user;
        res.status(200).json(user);
      })
      .catch(err => res.status(500).json({message: `A server error occured adding user: ${err}`}))
  } else {
    res.status(400).json({message: 'You must provide a username and password'});
  }
});

router.post('/login', (req, res) => {
  // implement login
  const {username, password} = req.body;

  if(username && password) {
    Users.getUserBy({username}).first()
      .then(user => {
        console.log(user)
        if(bcrypt.compareSync(password, user.password)) {
          const token = genToken(user);
          res.status(200).json({message: `Welcome ${user.username}`, token: token});
        } else {
          res.status(403).json({message: 'Invalid credentials'});
        }
      })
  } else {
    res.status(400).json({message: 'You must provide a username and password'});
  }


});

function genToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  }

  const options = {
    expiresIn: '4h'
  }

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
