const express = require('express');
const userCtrl = require('../controllers/user');
const pwdValidator = require('../middleware/password-validator');
const limiter = require('../middleware/rate-limits');

// To create separate routers for each main application user route by using the express.Router() method
const router = express.Router();

// POST route to save a user account (email and hash of the password) in the MariaDB database
//router.post('/signup', pwdValidator, limiter.signup, userCtrl.createUser);
router.post('/signup', userCtrl.createUser);

// POST route to log in to the user account saved in the MariaDB database
router.post('/login', userCtrl.login);

module.exports = router;