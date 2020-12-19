const router = require('express').Router();
let User = require('../models/user.model'); /* Mongoose schema model */
const crypto = require('crypto');

// Handles http get requests on the /users/ path
// return users in json format from the DB
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});


// Handles http post requests on the /users/add path
// adds new users to the database and hashes their passwords
router.route('/add').post((req, res) => {
  const username = req.body.username;
  const password = HashPassword(req.body.password);

  const newUser = new User({ username, password });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));

});

// hash password
const HashPassword = (password) => {
  const sha256 = crypto.createHash('sha256');
  const hash = sha256.update(password).digest('base64');
  return hash;
}


// exporting the router
module.exports =
  router
  ;

