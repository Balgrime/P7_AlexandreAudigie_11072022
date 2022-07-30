require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mysql = require("mysql");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials')
const app = express();
const path = require('path');
const allowedOrigins = require('./config/allowedOrigins');



const frontLink = process.env.linkFront;
const dbName = process.env.dbName;





// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);


//cross origin ressource sharing
//remove !origin after developpement phase
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));


//built-in middle to handle urlencoded data
app.use(express.urlencoded({ extended: true }));


// built-in middleware for json
app.use(express.json());


//middleware for cookies
app.use(cookieParser());



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




//limite le nombre de requêtes en un temps donné
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100000, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);




//Pour le dossier images
app.use('/images', express.static(path.join(__dirname, 'images')));





// Mes routes principales
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

app.use('/api/User', userRoutes);
app.use('/api/Post', postRoutes);




app.all('*', (req, res) => {
  res.status(404);
  res.type('txt').send("404 Not Found");
});



//Pour se connecter à la base de données mysql
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



module.exports = app;