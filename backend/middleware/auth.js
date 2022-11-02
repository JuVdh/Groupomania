// Use of jsonwebtoken package to create and verify authentication tokens allowing users to log in once to their account
const jwt = require('jsonwebtoken');

// Authentication middleware to extract the user ID from the decoded token initially extracted from the Authorization header
module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const decodedToken = jwt.verify(token, process.env.JWT_SECRETE);
		const userId = decodedToken.userId;
		const isAdmin = decodedToken.isAdmin;
		req.auth = {
			userId: userId,
			isAdmin: isAdmin
		};
		next();
	} catch(error) {
		res.status(401).json({message: `Invalid token ! ${ error }` });
	}
};