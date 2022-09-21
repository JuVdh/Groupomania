const express = require('express');
const auth = require('../middleware/auth');

const likeCtrl = require('../controllers/like');

// To create separate routers for each main application sauce route by using the express.Router() method
const router = express.Router();



// POST route to save a sauce in the MongoDB database

router.post('/:id', auth, likeCtrl.addLike);

module.exports = router;