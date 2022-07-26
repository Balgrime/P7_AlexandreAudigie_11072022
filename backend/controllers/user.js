const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');
const User = require('../models/User');



const mysql = require("mysql");
const dbName = process.env.dbName;

const mysqlconnection = mysql.createConnection({
    host: "localhost",
    port: "3307",
    user:'root',
    database: dbName
  })





exports.signup = (req, res, next) => {
    console.log(req.body.formValues.password);
    let form = req.body.formValues;

    var options = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'}
    let date = new Date().toLocaleDateString([], options);

    let userId = parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(8).toString().replace(".", ""))
    console.log(userId);

    bcrypt.hash(form.password, 10)
    .then(hash => {
            const user = {
                userId: userId,
                firstName: form.firstName,
                name: form.name,
                date: date,
                email: form.email,
                password: hash
            };
        console.log(user);
            //la requête SQL
            mysqlconnection.query(
                'INSERT INTO user SET ?', user, (error, results, fields)=>{
                    if (error){
                        console.log(error);
                        res.json({error});
                    } else {
                        console.log("--> results");
                        console.log(results);
                        res.json({message:"utilisateur enregistré"});
                    }
                }
            )
    });
}






exports.getAllUsers = (req, res, next) => {
//la requête SQL
mysqlconnection.query(
    'SELECT * FROM user',  (error, results, fields)=>{
        if (error){
            console.log(error);
            res.json({error});
        } else {
            console.log("--> results");
            console.log(results);
            res.json(results);
        }
    })
}



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