const Post = require('../models/post');

// Use of fs package which provides access to functions that allow us to modify the file system, including functions to delete files
const fs = require('fs');

// POST route controller to save a post in the MariaDB database
exports.createPost = (req, res) => {
    const postObject={
        title : req.body.title,
        content : req.body.content,
        likes : req.body.likes
    };
    delete postObject.id;
    delete postObject.userId;
    const post = new Post({
        ...postObject,
        userId: req.auth.userId
    });
    console.log(post.userId);
    post.save()
    .then(() => { res.status(201).json({message: 'post recorded !' })})
    .catch(error => res.status(400).json({ message: `save is not working ! ${error}` }))
};

// DELETE route controller to delete an existing Post in the MariaDB database
exports.deletePost = (req, res) => {
    console.log(req.params.id);
    Post.findOne( {where : { id: req.params.id}})
    .then(post => {
        console.log(post.userId);
        console.log(req.auth.userId);
        if (post.userId != req.auth.userId) {
            return res.status(403).json({ message: 'not authorized to deletePost !' })
            } else {
                //const filename = post.imageUrl.split('/images/')[1];
                //fs.unlink(`images/${filename}`, () => {
                    Post.destroy({where: {id:req.params.id, userId: req.auth.userId}})
                    .then(() => { res.status(200).json({message: 'Post deleted !'})})
                    .catch(error => res.status(400).json({ message: `delete is not working! ${error}` }))
                //});
            }
        })
    .catch( error => {
        console.log(req.params.id);
        res.status(404).json({ message: `find is not working ! ${error}` })
    });
};


// PUT route controller to update an existing Post in the MariaDBdatabase
exports.modifyPost = (req, res) => {
    // const sauceObject = req.file ? {
    //     ...JSON.parse(req.body.sauce),
    //     imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    // } : { ...req.body };
  
    const postObject={
        title : req.body.title,
        content : req.body.content,
        likes : req.body.likes
    };
    delete postObject.userId;

    Post.findOne({where: {id: req.params.id}})
    .then((post) => {
        if (post.userId != req.auth.userId) {
            return res.status(403).json({ message: 'not authorized to modifyPost !'})
            } else {
                //Post.update({where: { id: req.params.id}, { ...postObject, id: req.params.id}})
                post.set(postObject);
                post.save()
                // Post.update({
                //     title : req.body.title,
                //     content : req.body.content,
                //     likes : req.body.likes
                // })
                .then(() => res.status(201).json({message : 'Post modified!'}))
                .catch(error => res.status(400).json({ message: `update is not working ! ${error}` }))
            }
        }) 
    .catch((error) => {
        res.status(404).json({ message: `find is not working ! ${error}` })
    });
};

        
