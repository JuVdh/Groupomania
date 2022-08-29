const http = require('http');

// To load dotenv config
require('dotenv').config();

const app = require('./app');

// To return a valid port
const normalizePort = val => {
    const port = parseInt(val, 10);
  
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
};

const port = normalizePort(process.env.PORT ||'3000');
app.set('port', port);

// To handle errors
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// Call "createServer" method from the "http" package to create the node server
const server = http.createServer(app);

// To link callback error when event error is emited
server.on('error', errorHandler);

// To listen for "listening" events on the server and log to the console the port or named pipe the server is running on
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

// To launch the server on the indicated port
server.listen(port);
