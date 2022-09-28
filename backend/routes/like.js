const express = require('express');
const auth = require('../middleware/auth');

const likeCtrl = require('../controllers/like');

// To create separate routers for each main application sauce route by using the express.Router() method
const router = express.Router();

// POST route to save a like to the id post in the MariaDB database
router.post('/:id', auth, likeCtrl.totalLikes);
router.post('/:id/likes/', auth, likeCtrl.addLike);
router.delete('/:id/likes/', auth, likeCtrl.deleteLike);

module.exports = router;