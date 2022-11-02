const express = require('express');
const auth = require('../middleware/auth');

const likeCtrl = require('../controllers/like');

// To create separate routers for each main application like route by using the express.Router() method
const router = express.Router();

// POST route to save a like to the id post in the MariaDB database
router.post('/:id/likes/', auth, likeCtrl.addLike);

// GET route to retrieve the number of likes for the id post in the MariaDB database
router.get('/:id/likes/', auth, likeCtrl.totalLikes);

// DELETE route to delete the like previously stored for the id post in the MariaDB database
router.delete('/:id/likes/', auth, likeCtrl.deleteLike);

module.exports = router;