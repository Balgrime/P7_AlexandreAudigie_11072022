require('dotenv').config();
const fs = require('fs');
const sanitize = require("validator");
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
    
    let {email, password} = req.body.formValues;
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
  


  exports.editUser = (req, res, next) => {
    console.log("requete reçue");
    let json = JSON.parse(req.body.info);
    console.log(json)
  
  
    //On récupère le userId qui fait la requête depuis les headers du token 
    const token = req.headers.authorization;
  
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, decoded) => {
          if (err) return res.sendStatus(403); //invalid token
      
    let userId = decoded.UserInfo.userId;
  
  
  
    // S'assure que l'image du profil est nulle si aucune url n'a été fournie
    let profilImg = null;
    if(req.file?.filename !== undefined){
      profilImg = `${req.protocol}://${req.get('host')}/images/${req.file?.filename}`;
    }

    // Supprime l'ancienne image du dossier si une nouvelle image de profil est choisie
    if (req.file){
        mysqlconnection.query(
          `SELECT profilImageUrl FROM user WHERE userId='${userId}'`, (error, results, fields)=>{
              console.log("LAAAAAAAA"+results[0].profilImageUrl);
              let urlToRemove = results[0].profilImageUrl;
  
              // S'il y a un fichier dans la requête et qu'il y avait déjà une image dans la bdd, on supprime cette dernière
              if(urlToRemove !== undefined){
                const filenameToRemove = urlToRemove?.split('/images/')[1];
                fs.unlink(`images/${filenameToRemove}`, (res, err) => {
                if(err) console.log('error', err);})  
              }   
            })
          }
        
  
    //création du profil mis à jour avec les nouvelles infos
    let profil = {};
    if (req.file){
        profil = {
        firstName: json.firstName,
        name: json.name,
        profilImageUrl: profilImg,
        email: json.email
        }
      } else {
        profil = {
            firstName: json.firstName,
            name: json.name,
            email: json.email
      }
      }
  
    //on insère le post dans la bdd
    mysqlconnection.query(
        `UPDATE user SET ? WHERE userId='${userId}'`, profil, (error, user, fields)=>{
          if (error){
              console.log(error);
              res.json({error});
          } else {
              res.json({message:"profil updaté"});
          }
        })
      })
    };