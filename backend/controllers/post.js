const Post = require('../models/post');

// Use of fs package which provides access to functions that allow us to modify the file system, including functions to delete files
const fs = require('fs');

// POST route controller to save a post in the MariaDB database
exports.createPost = (req, res) => {
   
    Post.create({
        title : req.body.title,
        content : req.body.content,
        //attachment : req.body.attachment,
        attachment : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        userId: req.auth.userId
        
    })
    .then(() => { res.status(201).json({message: 'post recorded !' })})
    .catch(error => res.status(400).json({ message: `save is not working ! ${error}` }))
};

// DELETE route controller to delete an existing Post in the MariaDB database
exports.deletePost = (req, res) => {
    console.log(req.params.id);
    Post.findOne( {where : { id: req.params.id}})
    .then(post => {
        if (post.userId != req.auth.userId) {
            return res.status(403).json({ message: 'not authorized to deletePost !' })
            } else {
                    Post.destroy({where: {id:req.params.id, userId: req.auth.userId}})
                    .then(p => {
                        if (p.attachment) {
                        const filename = p.attachment.split('/images/')[1];
                        fs.unlink(`images/${ filename }`, error => error && console.error(error));
                        }
                        res.status(200).json({message: 'Post deleted !'})})
                    .catch(error => res.status(400).json({ message: `delete is not working! ${error}` }))
            }
        })
    .catch( error => {
        console.log(req.params.id);
        res.status(404).json({ message: `find is not working ! ${error}` })
    });
};


// PUT route controller to update an existing Post in the MariaDBdatabase
exports.modifyPost = (req, res) => {
    const postObject= (req.file || req.content) ? {
        ...JSON.parse(req.body.post),
        attachment : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        } : { ...req.body};
    Post.findOne({where: {id: req.params.id}})
    .then((post) => {
        if (post.userId != req.auth.userId) {
            return res.status(403).json({ message: 'not authorized to modifyPost !'})
            } else {
                postObject.userId=req.auth.userId;
                Post.create(postObject)
                .then(() => res.status(201).json({message : 'Post modified!'}))
                .catch(error => res.status(400).json({ message: `update is not working ! ${error}` }))
            }
        }) 
    .catch((error) => {
        res.status(404).json({ message: `find is not working ! ${error}` })
    });
};

// GET route controller to return one post of the MariaDB database when you click on it
exports.getOnePost = (req, res, next) => {
    console.log(req.params.id);
    Post.findOne({ where : {id: req.params.id }})
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({ message: `find post is not working ! ${error}` }))
};

// GET route controller to return all the posts present in the MariaDB database
exports.getAllPosts = (req, res, next) => {
    Post.findAll({
        order: [['id', 'DESC']]
    })
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(404).json({ message: `find all the posts is not working ! ${error}` }))
};
 
   
