const express = require('express');
const helmet = require('helmet');
const mysql = require("mysql");
const cors = require('cors');
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


mysqlconnection.connect((err)=>{
  if(err){
    console.log(`error connecting:${err.stack}`)
  } else {
    console.log("connecté à la bonne base de donnée!")
    console.log(`connected as id ${mysqlconnection.threadId}`)
  }
})




//cross origin ressource sharing
const whitelist = ['http://localhost:3000']
app.use(cors());


const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10000, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});




app.use(helmet());
// Configuration des headers :
app.use((req, res, next) => {
  // res.setHeader('Access-Control-Request-Headers', '*');
  // res.setHeader('Access-Control-Request-Method', 'GET, POST, PUT, DELETE');
  // res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader(
  //   'Access-Control-Allow-Headers',
  //   'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, Accept-Encoding, Accept-Language, Content-Length, Cross-Origin-Ressource-Policy'
  // );
  // res.setHeader('Access-Control-Allow-Credentials', false);
  // res.setHeader(
  //   'Access-Control-Allow-Methods',
  //   'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  // );
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
});


app.use(express.urlencoded({ extended: true }));


app.use(limiter);




app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/User', userRoutes);
//app.use('/api/sauces', sauceRoutes);


module.exports = app;