const Like = require('../models/like');
const Post = require('../models/post');

// POST route controller to save a like in the MariaDB database
exports.addLike = (req, res) => {
    Like.findOne({where : { postId: req.params.id, userId: req.auth.userId}})
    .then(like => {
        if (like) {
            return res.status(403).json({ message: 'already liked !' });
        }
        
        
        // if (post.userId != req.auth.userId) {
        //    return res.status(403).json({ message: 'not authorized to addLike !' })
        //     } else {
                    
                Like.create({
                    likes : req.body.likes,
                    postId : req.params.id,
                    userId : req.auth.userId
                })
                //.then(() => { res.status(201).json({message: 'like recorded !' })})
                .then(like=> {
                    
                    res.status(201).json(like);
                    
                })
                .catch(error => res.status(400).json({ message: `add like is not working ! ${error}` }))
            // }
        })
    .catch( error => {
        res.status(404).json({ message: `find is not working ! ${error}` })
    });
};
