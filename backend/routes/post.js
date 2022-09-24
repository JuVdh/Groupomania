const express = require('express');
const auth = require('../middleware/auth');
const multer = require ('../middleware/multer-config');
const postCtrl = require('../controllers/post');

// To create separate routers for each main application post route by using the express.Router() method
const router = express.Router();

// GET route to return all the posts present in the MariaDB database
router.get('/', auth, postCtrl.getAllPosts);

// POST route to save a post in the MariaDB database
router.post('/', auth, multer, postCtrl.createPost);

// PATCH route to update the id Post in the MariaDB database
router.patch('/:id', auth, multer, postCtrl.modifyPost);

// // DELETE route to delete the id Post in the MariaDB database
router.delete('/:id', auth, postCtrl.deletePost);

// // GET route to return the id post of the MariaDB database when you click on it
router.get('/:id', auth, postCtrl.getOnePost);

// // POST route to set the "Like" status of the id sauce for the provided userId
// router.post('/:id/like', auth, postCtrl.addLikeStatus);

module.exports = router;