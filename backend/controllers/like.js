const Like = require('../models/like');
const Post = require('../models/post');

// POST route controller to save a like in the MariaDB database
exports.addLike = (req, res) => {
    Post.findOne({where : { id: req.params.id}})
    .then(post => {
        // if (post.userId != req.auth.userId) {
        //    return res.status(403).json({ message: 'not authorized to addLike !' })
        //     } else {
                    
                Like.create({
                    likes : 1
                })
                .then(() => { res.status(201).json({message: 'like recorded !' })})
                .catch(error => res.status(400).json({ message: `add like is not working ! ${error}` }))
            // }
        })
    .catch( error => {
        res.status(404).json({ message: `find is not working ! ${error}` })
    });
};
