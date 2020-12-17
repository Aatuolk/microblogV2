const router = require('express').Router();
let User = require('../models/user.model');
const crypto = require('crypto');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const password = getHashedPassword(req.body.password);

  const newUser = new User({username,password});

  newUser.save()
    .then(() => res.json('User added!') )
    .catch(err => res.status(400).json('Error: ' + err));
});

// hash password
const getHashedPassword = (password) => {
  const sha256 = crypto.createHash('sha256');
  const hash = sha256.update(password).digest('base64');
  return hash;
}



module.exports = 
  router
;

