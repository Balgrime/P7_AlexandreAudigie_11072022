require('dotenv').config();
const fs = require('fs');
const sanitize = require("validator");
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');

const mysql = require("mysql");
const dbName = process.env.dbName;
const port = process.env.port;

const mysqlconnection = mysql.createConnection({
    host: "localhost",
    port: port,
    user:'root',
    database: dbName
  })


  

exports.signup = (req, res, next) => {
    let form = req.body.formValues;

    if (form?.firstName !=="" && form?.name !== ""){
      let nameBefore = form.name;
      let name = sanitize.blacklist(nameBefore, "<>/");
      let firstNameBefore = form.firstName;
      let firstName = sanitize.blacklist(firstNameBefore, "<>/");


      var options = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'}
    let date = new Date().toLocaleDateString([], options);

    let userId = parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(8).toString().replace(".", ""))

    bcrypt.hash(form.password, 10)
    .then(hash => {
            const user = {
                userId: userId,
                firstName: firstName,
                name: name,
                date: date,
                email: form.email,
                password: hash,
                role: 2834
            };
        // on enregistre l'utilisateur dans la bdd
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
                    // Creates Secure Cookie with refresh token 
                    //res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

                    // Send authorization role, userId and access token to user
                    res.json({ role, userId, accessToken });
                }
            }).catch(error => res.status(500).json({ error }));
        }
    });
};


exports.logout = (req, res) => {
    //On récupère le userId qui fait la requête depuis les headers du token 
  const token = req.headers.authorization;
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
        if (err) return res.sendStatus(403); //invalid token
  let userId = decoded.UserInfo.userId;

  // On compare le userId du token à celui de la bdd
  mysqlconnection.query(
    `SELECT userId FROM user WHERE userId = ${userId}`, (error, results, fields)=>{
      if (results) res.json({message:"logout effectué"});
        })
    })
}



exports.getAllUsers = (req, res, next) => {
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

let bodyUserId = req.body.userId;

  //On récupère le userId qui fait la requête depuis les headers du token 
  const token = req.headers.authorization;

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
        if (err) return res.sendStatus(403); //invalid token
    
  let userId = decoded.UserInfo.userId;

  // Ne supprime le compte que si le userId de la requête équivaut à celui contenu dans le token (ou à l'admin)
  if(userId === bodyUserId || userId === 12199815){
  // Supprime l'image du profil du dossier images (si elle était présente)
  mysqlconnection.query(
    `SELECT profilImageUrl FROM user WHERE userId='${bodyUserId}'`, (error, results, fields)=>{
      if (error){
        console.log(error);
      } else if (results) {
        console.log(results[0]?.profilImageUrl);
        let urlToRemove = results[0]?.profilImageUrl;

        if(urlToRemove !== null){
          const filenameToRemove = urlToRemove?.split('/images/')[1];
          fs.unlink(`images/${filenameToRemove}`, (res, err) => {
          if(err) console.log('error', err);})  
        } 
      }
    })

    // On supprime l'utilisateur correspondant au userId de la requête
    mysqlconnection.query(
      `DELETE FROM user WHERE userId='${bodyUserId}'`, (error, results, fields)=>{
        if (error){
          console.log(error);
          res.json({error});
      } else if (results !== null) {
        res.json({message:"utilisateur supprimé"});
      }
    })
  }
}
)}

  

  exports.editUser = (req, res, next) => {
    let json = JSON.parse(req.body.info);
  
    if (json?.firstName !=="" && json?.name !== ""){
      let nameBefore = json.name;
      let name = sanitize.blacklist(nameBefore, "<>/");
      let firstNameBefore = json.firstName;
      let firstName = sanitize.blacklist(firstNameBefore, "<>/");

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
              let urlToRemove = results[0].profilImageUrl;
  
              // S'il y a un fichier dans la requête et qu'il y avait déjà une image dans la bdd, on supprime cette dernière
              if(urlToRemove !== undefined){
                const filenameToRemove = urlToRemove?.split('/images/')[1];
                fs.unlink(`images/${filenameToRemove}`, (res, err) => {
                if(err) console.log('error', err);})  
              }   
            })
          }
        
    //création du profil mis à jour avec les nouvelles infos selon la présence de l'image
    let profil = {};
    if (req.file){
        profil = {
        firstName: firstName,
        name: name,
        isPrivate: json.isPrivate,
        profilImageUrl: profilImg
        }
      } else {
        profil = {
            firstName: firstName,
            name: name,
            isPrivate: json.isPrivate
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
    }
  };