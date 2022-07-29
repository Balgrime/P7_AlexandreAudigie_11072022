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
    console.log(req.headers);

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, decoded) => {
          if (err) return res.sendStatus(403); //invalid token
          console.log(decoded.UserInfo.userId);
          console.log(decoded.UserInfo.role);
          let verifiedUserId = decoded.UserInfo.userId;
          console.log("iciiiiii"+ verifiedUserId)

        //la requête SQL
        mysqlconnection.query(
          `SELECT userId FROM user WHERE userId ='${verifiedUserId}'`, (error, results, fields)=>{
            console.log(results[0].userId);
              if (results[0].userId !== undefined){
                next();
              } else {
                res.json({message: "Aucun utilisateur avec cet identifiant trouvé dans la base de données"})
              }
          }
        )
      }
    );
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};