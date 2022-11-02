const Like = require('../models/like');
const Post = require('../models/post');

// POST route controller to save a like in the MariaDB database
exports.addLike = (req, res) => {
	Like.findOne({where : { postId: req.params.id, userId: req.auth.userId}})
	.then(like => {
		if (like) {
			return res.status(403).json({ message: 'already liked !' });
		}
		Like.create({
			likes : req.body.likes,
			postId : req.params.id,
			userId : req.auth.userId
		})
		.then(like=> {
			res.status(201).json(like);
		})
		.catch(error => res.status(400).json({ message: `add like is not working ! ${error}` }))
	})
	.catch( error => {
		res.status(404).json({ message: `find is not working ! ${error}` })
	});
};

exports.deleteLike = (req, res) => {
	Like.findOne({where : { postId: req.params.id, userId: req.auth.userId}})
	.then(like => {
		if (like.userId != req.auth.userId) {
			return res.status(403).json({ message: 'not authorized to deleteLike !' })
		} else {
			like.destroy();
			return res.status(200).json({ message:  'Like deleted !' })
		}
	})
	.catch( error => {
		res.status(404).json({ message: `find is not working ! ${error}` })
	});
};

exports.totalLikes = async (req, res) => {
	try {
		const likeCount = await Like.count({ where : {postId : req.params.id}});
		const alreadyLiked = !!await Like.findOne({where : {postId: req.params.id, userId : req.auth.userId}});
		res.status(200).json({likeCount,alreadyLiked});
	} catch (error) {
		res.status(500).json({message :`count total likes is not working ! ${error}` });
	}
}
