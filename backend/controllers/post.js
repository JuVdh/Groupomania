const post = require('../models/post');

// Use of fs package which provides access to functions that allow us to modify the file system, including functions to delete files
const fs = require('fs');

// // POST route controller to save a post in the MariaDB database
// exports.createPost = (req, res, next) => {
//     const sauceObject = JSON.parse(req.body.sauce);
//     delete sauceObject._id;
//     delete sauceObject._userId;
//     const sauce = new Sauce({
//         ...sauceObject,
//         userId: req.auth.userId,
//         imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
//         likes: 0,
//         dislikes: 0, 
//         usersLiked: [],
//         usersDisliked: []
//     });
  
//     sauce.save()
//     .then(() => { res.status(201).json({message: 'Sauce recorded !' })})
//     .catch(error => res.status(400).json({ message: `save is not working ! ${error}` }))
// };

// // PUT route controller to update an existing Sauce in the MongoDB database
// exports.modifySauce = (req, res, next) => {
//     const sauceObject = req.file ? {
//         ...JSON.parse(req.body.sauce),
//         imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
//     } : { ...req.body };
  
//     delete sauceObject._userId;

//     Sauce.findOne({_id: req.params.id})
//     .then((sauce) => {
//         if (sauce.userId != req.auth.userId) {
//             return res.status(403).json({ message: 'not authorized to modifySauce !'})
//             } else {
//                 Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})
//                 .then(() => res.status(201).json({message : 'Sauce modified!'}))
//                 .catch(error => res.status(400).json({ message: `update is not working ! ${error}` }))
//             }
//         }) 
//     .catch((error) => {
//         res.status(404).json({ message: `find is not working ! ${error}` })
//     });
// };

// // DELETE route controller to delete an existing Post in the MariaDB database
// exports.deletePost = async () => {
//     Post.findOne({ _id: req.params.id})
//     .then(sauce => {
//         if (sauce.userId != req.auth.userId) {
//             return res.status(403).json({ message: 'not authorized to deleteSauce !' })
//             } else {
//                 const filename = sauce.imageUrl.split('/images/')[1];
//                 fs.unlink(`images/${filename}`, () => {
//                     Sauce.deleteOne({_id: req.params.id})
//                     .then(() => { res.status(200).json({message: 'Sauce deleted !'})})
//                     .catch(error => res.status(400).json({ message: `delete is not working! ${error}` }))
//                 });
//             }
//         })
//     .catch( error => {
//         res.status(404).json({ message: `find is not working ! ${error}` })
//     });
// };

// // POST route controller to set the "Like" status for the provided userId
// // exports.addLikeStatus = (req, res, next) => {
// //     const like = req.body.like;
// //     const userId=req.auth.userId;
            
// //     Sauce.findOne({_id: req.params.id})
// //     .then((sauce) => {
// //         switch (like) {
// //             case 1:
// //                 if (!sauce.usersLiked.includes(userId) && !sauce.usersDisliked.includes(userId)){
// //                     sauce.usersLiked.push(userId);
// //                 }
// //                 break;
// //             case -1:
// //                 if (!sauce.usersLiked.includes(userId) && !sauce.usersDisliked.includes(userId)){
// //                     sauce.usersDisliked.push(userId);
// //                 }
// //                 break;
// //             case 0:
// //                 let posLiked=sauce.usersLiked.indexOf(userId);
// //                 let posDisLiked=sauce.usersDisliked.indexOf(userId);
// //                 sauce.usersLiked.splice(posLiked,1);
// //                 sauce.usersDisliked.splice(posDisLiked,1);
// //                 break;
// //             default:
// //                 res.status(400).json( {message: 'bad request !' })
// //                 break;
// //         }
// //         sauce.likes=sauce.usersLiked.length;
// //         sauce.dislikes=sauce.usersDisliked.length;

// //         sauce.save()
// //         .then(() => { res.status(201).json({message: 'like/dislike recorded !'})})
// //         .catch(error => { res.status(400).json( {message: `save is not working! ${error}` })})
// //     })
// //     .catch(error => res.status(404).json({ message: `find is not working ! ${error}` }))
// // }

exports.deleteOnePost = async () => {
    await post.findOne({ where: { id: '1' } })
    .then(post => {
        post.destroy();
    })
   .catch( error => {
        console.log("error : " + error);
    });
};

// GET route controller to return all the posts present in the MariaDB database
exports.getAllPosts = async () => {
    await post.findAll()
    .then((posts) => {
        for (const post of posts) {
            console.log(post.dataValues);
        } 
    })
    .catch((error) => {
          console.log("error : " + error);
    });
};
 
