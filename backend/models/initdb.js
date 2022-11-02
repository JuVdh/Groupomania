// Database
const Db = require('../config/database');

// models
const User = require('./user');
const Post = require('./post');
const Like = require('./like');

let Init = async () => {
	try {
		await Db.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
	Post.belongsTo(User, {onDelete: 'CASCADE'});
	Like.belongsTo(User, {onDelete: 'CASCADE'});
	Like.belongsTo(Post, {onDelete: 'CASCADE'});
	Post.hasMany(Like);
	
	await User.sync({alter: true});
	await Post.sync({alter: true});
	await Like.sync({alter: true});
}

module.exports = Init;