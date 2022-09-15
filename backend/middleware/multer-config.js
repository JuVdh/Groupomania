// Use of Multer file management package which helps manage incoming files in HTTP requests
const multer = require('multer');

// Dictonary of the format and type of the incoming files
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// To tell multer where to save incoming files by using its diskStorage() method to configure path and filename
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

// To export the multer element indicating that we will only handle image file uploads
module.exports = multer({storage: storage}).single('image');