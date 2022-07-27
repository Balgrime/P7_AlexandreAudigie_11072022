const jwt = require('jsonwebtoken');
require('dotenv').config();


const mysql = require("mysql");
const dbName = process.env.dbName;

const mysqlconnection = mysql.createConnection({
    host: "localhost",
    port: "3307",
    user:'root',
    database: dbName
  })



module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(token);

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, decoded) => {
          if (err) return res.sendStatus(403); //invalid token
          console.log( decoded.UserInfo.userId);
          console.log(decoded.UserInfo.role);
          let verifiedUserId = 82734;
          console.log("LALALALlA"+verifiedUserId);

        //la requête SQL
        mysqlconnection.query(
          `SELECT * FROM user WHERE userId ='${verifiedUserId}'`, (error, results, fields)=>{
           /* if (error){
              console.log(error);
              res.json({error});
          } else {
              console.log("--> results");
              console.log("LES RESULTATS ICII"+results[0].userId);
              res.json({message:"utilisateur enregistré"});
          }
*/              
              if (results[0] !== undefined){
                if (results[0].userId === verifiedUserId){
                  next();
                } else {
                  res.json({message: "Aucun utilisateur avec cet identifiant trouvé dans la base de données"})
                }
              }
              
          }
        )
      }
  );


    
   /* const decodedToken = jwt.verify(token, SECRET_TOKEN);
    const userId = decodedToken.userId;
    req.auth = { userId };
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      console.log("le token décodé correpond!")
      next();
    }
  */} catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};