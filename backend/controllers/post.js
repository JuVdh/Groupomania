const Post = require('../models/post');
const Like = require('../models/like');

// Use of fs package which provides access to functions that allow us to modify the file system, including functions to delete files
const fs = require('fs');
const { addLikeStatus } = require('../../../HotTakes/backend/controllers/sauce');

// POST route controller to save a post in the MariaDB database
exports.createPost = (req, res) => {
   if ((!req.body.content) && (!req.file)){
        res.status(400).json({message: 'your post should contain at least text or attached file' });
   } else {
        const postObject = req.file ? {
            title : req.body.title,
            content : req.body.content,
            attachment : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    postObject.userId=req.auth.userId;
    Post.create(postObject)
    .then(() => { res.status(201).json({message: 'post recorded !' })})
    .catch(error => res.status(400).json({ message: `create post is not working ! ${error}` }))
    }
};

// DELETE route controller to delete an existing Post in the MariaDB database
exports.deletePost = (req, res) => {
    Post.findOne({where : { id: req.params.id}})
    .then(post => {
        if (post.userId != req.auth.userId) {
           return res.status(403).json({ message: 'not authorized to deletePost !' })
            } else {
                let filename = null;
                    if (post.attachment) {
                        filename = post.attachment.split('/images/')[1];
                    }   
                    Post.destroy({where: {id:req.params.id, userId: req.auth.userId}})
                    .then(() => {
                        if (filename) {
                            fs.unlink(`images/${ filename }`, error => error && console.error(error));
                        }
                        res.status(200).json({message: 'Post deleted !'})})
                    .catch(error => res.status(400).json({ message: `delete is not working! ${error}` }))
            }
    })
    .catch( error => {
        res.status(404).json({ message: `find is not working ! ${error}` })
    });
};

// PATCH route controller to update an existing Post in the MariaDBdatabase
exports.modifyPost = (req, res) => {
    const newImageUrl = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;
    Post.findOne({where: {id: req.params.id}})
    .then((post) => {
        if (post.userId != req.auth.userId) {
            const filename = newImageUrl.split('/images/')[1];
            fs.unlink(`images/${ filename }`, error => error && console.error(error));
            return res.status(403).json({ message: 'not authorized to modifyPost !'})
            } else {
                if ((newImageUrl || req.body.delete) && post.attachment){
                    const filename = post.attachment.split('/images/')[1];
                    fs.unlink(`images/${ filename }`, error => error && console.error(error));
                } 
                if (newImageUrl) {
                    post.attachment = newImageUrl;
                }
                else if (req.body.delete) {
                    post.attachment = null;
                }
                post.set({
                    title : req.body.title, 
                    content : req.body.content
                });
                post.save()
                .then(() => res.status(201).json({message : 'Post modified!'}))
                .catch(error => res.status(400).json({ message: `update is not working ! ${error}` }))
            }
        }) 
    .catch((error) => {
        res.status(404).json({ message: `find is not working ! ${error}` })
    });
};

// GET route controller to return one post of the MariaDB database when you click on it
exports.getOnePost = (req, res) => {
    console.log(req.params.id);
    Post.findOne({ where : {id: req.params.id }})
    .then(async post => {
        console.log(post);
        const likeCount= await post.countLikes();
        const alreadyLiked = !!await Like.findOne({where : {postId: req.params.id, userId : req.auth.userId}});
        res.send({post, likeCount, alreadyLiked});
        //res.status(200).json(post);
    })
    .catch(error => res.status(404).json({ message: `find post is not working ! ${error}` }))
};

// GET route controller to return all the posts present in the MariaDB database
exports.getAllPosts = async (req, res) => {
    const posts = await Post.findAll({
        order: [['updatedAt', 'DESC']],
        include: Like,
    });

    res.send(posts);
};
    
  
   
