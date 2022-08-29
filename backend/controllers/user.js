// Use of bcrypt encryption package for secure password hashing
const bcrypt = require ('bcrypt');

// Use of jsonwebtoken package to create and verify authentication tokens allowing users to log in once to their account
const jwt = require('jsonwebtoken');

const User = require ('../models/user');

// POST route controller to save a user account (email and hash of the password) in the MongoDB database
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
        email: req.body.email,
        password: hash
        });
        user.save()
        .then(() => res.status(201).json({ message: 'user created !' }))
        .catch(error => res.status(400).json({ message: `save is not working ! ${error}` }));
    })
    .catch(error => res.status(500).json({ message: `bcrypt error ! ${error}` }));
};

// POST route controller to check if a user trying to log in has valid credentials
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if (user===null) {
            return res.status(404).json({ message: `no known user with this email ! ${error}` });
            } else {
                bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: `password is not valid ! ${error}` });
                        } else {
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign(
                                    {userId:user._id},
                                    process.env.JWT_SECRETE,
                                    {expiresIn:'24h'}
                                )
                            });
                        }
                    })
                .catch(error => res.status(500).json({ message: `bcrypt error! ${error}` }));
            }
        })
    .catch(error => res.status(404).json({ message: `find is not working ! ${error}` })); 
};