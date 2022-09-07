const express = require('express');
const auth = require('../middleware/auth');
const multer = require ('../middleware/multer-config');
const postCtrl = require('../controllers/post');

// To create separate routers for each main application sauce route by using the express.Router() method
const router = express.Router();

// GET route to return all the sauces present in the MongoDB database
//router.get('/', auth, postCtrl.getAllPosts);
//router.get('/', postCtrl.getAllPosts);

// POST route to save a sauce in the MongoDB database

//router.post('/', auth, multer, postCtrl.createSauce);
//router.post('/', postCtrl.createPost);

// // PUT route to update the id Sauce in the MongoDB database
// router.put('/:id', auth, multer, postCtrl.modifySauce);

// // DELETE route to delete the id Sauce in the MongoDB database
// router.delete('/:id', auth, postCtrl.deleteSauce);

// // GET route to return the id sauce of the MongoDB database when you click on it
// router.get('/:id', auth, postCtrl.getOneSauce);

// // POST route to set the "Like" status of the id sauce for the provided userId
// router.post('/:id/like', auth, postCtrl.addLikeStatus);

module.exports = router;