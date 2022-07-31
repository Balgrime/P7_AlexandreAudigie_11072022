require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');

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
                password: hash,
                role: 2834
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
            })
    });
}







exports.login = (req, res, next) => {
    
    let { email, password} = req.body.formValues;
    mysqlconnection.query('SELECT * FROM user', (error, result)=>{
        let userArray = result.filter(user => user.email === email)
        let user = userArray[0];

        if (!user) {
            return res.status(401).json({ message: 'Le mot de passe ou l\'email est incorrect !' })
        } else {
            bcrypt.compare(password, user.password).then(valid =>{
                if (!valid){
                    console.log(valid);
                    return res.status(401).json({ message: 'Le mot de passe ou l\'identifiant est incorrect !' })
                } else {
                    const role = user.role;
                    console.log("c'est"+role);
                    const userId = user.userId;
                    // create JWTs token d'accès
                    const accessToken = jwt.sign(
                        {
                            "UserInfo": {
                                "userId": user.userId,
                                "role": role
                            }
                        },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: '24h' }
                    );
                    const refreshToken = jwt.sign(
                        { "userId": user.userId },
                        process.env.REFRESH_TOKEN_SECRET,
                        { expiresIn: '1d' }
                    );
                        //la requête SQL
                        mysqlconnection.query(
                            `UPDATE user SET refreshToken='${refreshToken}' WHERE userId='${user.userId}'`, (error, user, fields)  => {
                                if (error){
                                    console.log(error);
                                    res.json({error});
                                } else {
                                    console.log("--> results");
                                    console.log(user);
                                }
                            })
                            
                    // Creates Secure Cookie with refresh token : je désactive pour le developpement
                    //res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

                    // Send authorization roles and access token to user
                    res.json({ role, userId, accessToken });
                }
            }).catch(error => res.status(500).json({ error }));
        }
    });
};



exports.logout = (req, res) => {
    // On client, also delete the accessToken
    res.json({message: "requête reçue!"});
    /*const cookies = req.cookies;
    console.log(cookies?.jwt)
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    // Delete refreshToken in db
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);*/
}





exports.getAllUsers = (req, res, next) => {
//la requête SQL
mysqlconnection.query(
    'SELECT * FROM user', (error, results, fields)=>{
        if (error){
            console.log(error);
            res.json({error});
        } else {
            res.json(results);
        }
    })
}



exports.getOneUser = (req, res, next) => {
let currentId = req.params.id;
mysqlconnection.query(
    `SELECT * FROM user WHERE userId = '${currentId}'`,  (error, results, fields)=>{
        if (error){
            console.log(error);
            res.json({error});
        } else {
            console.log("--> results");
            console.log(results[0]);
            res.json(results[0]);
        }
    })
}


exports.deleteUser = (req, res, next) => {
    console.log("requete reçue");
    /*
    Sauce.findOne({ _id: req.params.id }).then(
      (sauce) => {
        if (!sauce) {
          res.status(404).json({
            error: new Error('No such Thing!')
          });
        }
        if (sauce.userId !== req.auth.userId) {
          res.status(403).json({
            error: new Error('Unauthorized user!')
          });
        } else {
          Sauce.findOne({ _id: req.params.id })
            .then(sauce => {
              const filename = sauce.imageUrl.split('/images/')[1];
              fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                  .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
                  .catch(error => res.status(400).json({ error }));
              });
            })
            .catch(error => res.status(500).json({ error }));
        }
      }
    )*/
  };
  