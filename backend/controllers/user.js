const bcrypt = require ('bcrypt');
const jwt=require('jsonwebtoken');
const User = require('../models/user');

exports.createUser = async (req, res) => {
    try {
        let user = await User.findOne({where: {email: req.body.email}});
        if (!user) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                const newUser = new User({
                    email: req.body.email,
                    password: hash
                });
                
                newUser.save()
                .then(user=> {
                    res.status(201).json({message : `${user.email} REGISTERED`})
                })
                .catch(err => {
                    res.send('ERROR: '+err)
                }) 
            })
        } else {
            res.json({ error: "USER ALREADY EXISTS"})
        }
    } catch (error) {
        res.status(400).json({message : `${error}`});
    }
}

// POST route controller to check if a user trying to log in has valid credentials
exports.login = (req, res, next) => {
    User.findOne({where : { email: req.body.email }})
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
                                userId: user.id,
                                isAdmin: user.isAdmin,
                                token: jwt.sign(
                                    {userId:user.id,
                                    isAdmin: user.isAdmin},
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
}