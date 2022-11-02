const express = require('express');

// Use of Helmet middleware helping secure Express apps by setting various HTTP headers
const helmet = require('helmet');

const initDB = require('./models/initdb');
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
const likeRoutes = require('./routes/like');
const path = require('path');

// Call "express()" method to create Express application
const app = express();

// To add the option that disables crossOriginResourcePolicy to prevent Helmet from destroying the CORS configuration
app.use(helmet({
  crossOriginResourcePolicy: false, 
}));

// This middleware will apply to all routes, allowing all requests from all origins ('*') to access the API, and allowing queries to be sent with the methods 'GET, POST, PUT, DELETE, PATCH, OPTIONS'
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

initDB().then(() => {
  // To extract the JSON body in order to handle the POST request coming from the front-end application
  app.use(express.json());
  // To tell Express to statically handle the images resource (a subdirectory of the home directory, __dirname) each time it receives a request to the /images route
  app.use('/images', express.static(path.join(__dirname, 'images')));
  // To assign middlewares to routes
  app.use('/api/auth', userRoutes);
  app.use('/api/posts',postRoutes);
  app.use('/api/posts',likeRoutes);
}).catch((error) => {
  console.log("error : " + error);
});

// To make the Express "app" application accessible to other files
module.exports = app;