const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');
const User = require('../models/User');
const mysql = require("mysql");





exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        console.log(hash);
        console.log(req);
        })
    };






    /*
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
                .catch(() =>  res.status(401).json({ message: "L'utilisateur existe déjà !"}));
        })
        .catch(error => res.status(500).json({ error }));
};
*/




/*

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Le mot de passe ou l\'identifiant est incorrect !' })
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid =>{
                        if (!valid){
                            return res.status(401).json({ message: 'Le mot de passe ou l\'identifiant est incorrect !' })
                        } else {
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign(
                                    { userId: user._id },
                                    'RANDOM_TOKEN_SECRET',
                                    { expiresIn: '24h' }
                                )
                            });
                        }
                    })
                    .catch(error => res.status(500).json({ error }));
                }
        })
        .catch(error => res.status(500).json({ error }));
};*/