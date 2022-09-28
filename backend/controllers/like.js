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
    // console.log(req.auth.userId);
    // console.log("I want to delete the like for the post");
    // console.log(req.params.id);
};

exports.totalLikes = async (req, res) => {
      
    const { count, rows } = await Like.findAndCountAll({where : { postId: req.params.id}});
    console.log(count);
    Post.findOne({where : {id : req.params.id}})
    .then(post =>{
        post.likes = count;
        post.save();
        return res.status(200).json(post)
    })
        
    .catch( error => {
        res.status(404).json({ message: `find is not working ! ${error}` })
    });
};