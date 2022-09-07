const bcrypt = require ('bcrypt');
const User = require('../models/user');
//const Db = require('../config/database');
//const { extensions } = require('sequelize/types/utils/validator-extras');

exports.createUser = async (req, res) => {
    
    //console.log(JSON.stringify(req.body.email));

    await User.findOne({
        where: {email: JSON.stringify(req.body.email)}
    })
    .then(user => {
        if (!user) {
            console.log("new user");
            bcrypt.hash(JSON.stringify(req.body.password), 10, (err, hash) => {
                const newUser = new User({
                    email: JSON.stringify(req.body.email),
                    password: hash
                });
                
                newUser.save()
                .then(user=> {
                    //res.json({status: user.email + 'REGISTERED'})
                    res.status(201).json({message : `${user.email} REGISTERED`})
                })
                .catch(err => {
                    res.send('ERROR: '+err)
                }) 
            })

        } else {
            res.json({ error: "USER ALREADY EXISTS"})
        }
    })
    .catch(err=> {
        res.send('ERROR: '+err)
    })
}