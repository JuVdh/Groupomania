// Use of Express Rate Limit middleware to limit repeated requests to public APIs and/or endpoints such as password reset
const rateLimit = require('express-rate-limit');

// Security measure to limit the number of invalid connections
const login = rateLimit({
	windowMs: 15 * 60 * 1000,
	max : 5,
	message : 'Too many tries in the last 15 minutes',
	standardHeaders: true,
	legacyHeaders: false,
})

// Security measure to limit the number of account creations from the same IP address
const signup = rateLimit({
	windowMs: 60 * 60 * 1000,
	max : 5,
	message : 'Too many accounts created from this IP, please try again after one hour',
	standardHeaders: true,
	legacyHeaders: false,
})

module.exports = {login, signup};