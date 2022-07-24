const express = require('express');

const mysql = require("mysql");

const app = express();
const path = require('path');

require('dotenv').config();

const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');


const frontLink = process.env.linkFront;
const dbName = process.env.dbName;

app.use(express.json());



const mysqlconnection = mysql.createConnection({
  host: "localhost",
  port: "3307",
  user:'root',
  database: dbName
})

console.log(mysqlconnection);

mysqlconnection.connect((err)=>{
  if(err){
    console.log(`error connecting:${err.stack}`)
  } else {
    console.log("connecté à la bonne base de donnée!")
    console.log(`connected as id ${mysqlconnection.threadId}`)
  }
})




app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', frontLink);
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});



app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);


module.exports = app;