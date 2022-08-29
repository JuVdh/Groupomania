const express = require('express');
const auth = require('../middleware/auth');
const multer = require ('../middleware/multer-config');
const sauceCtrl = require('../controllers/sauce');

// To create separate routers for each main application sauce route by using the express.Router() method
const router = express.Router();

// GET route to return all the sauces present in the MongoDB database
router.get('/', auth, sauceCtrl.getAllSauces);

// POST route to save a sauce in the MongoDB database
router.post('/', auth, multer, sauceCtrl.createSauce);

// PUT route to update the id Sauce in the MongoDB database
router.put('/:id', auth, multer, sauceCtrl.modifySauce);

// DELETE route to delete the id Sauce in the MongoDB database
router.delete('/:id', auth, sauceCtrl.deleteSauce);

// GET route to return the id sauce of the MongoDB database when you click on it
router.get('/:id', auth, sauceCtrl.getOneSauce);

// POST route to set the "Like" status of the id sauce for the provided userId
router.post('/:id/like', auth, sauceCtrl.addLikeStatus);

module.exports = router;