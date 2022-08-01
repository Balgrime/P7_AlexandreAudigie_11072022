const jwt = require ('jsonwebtoken');
const sanitize = require("validator");
const fs = require('fs');



const mysql = require("mysql");
const dbName = process.env.dbName;

const mysqlconnection = mysql.createConnection({
  host: "localhost",
  port: "3307",
  user:'root',
  database: dbName
});


exports.createPost = (req, res, next) => {
  let json = JSON.parse(req.body.info);
  let textBefore = json?.text;
  let text = sanitize.blacklist(textBefore, "<>\"/");


  //On récupère le userId qui fait la requête depuis les headers du token 
  const token = req.headers.authorization;

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
        if (err) return res.sendStatus(403); //invalid token
    
  let userId = decoded.UserInfo.userId;

  
  // On récupère le postId du post suivi si jamais on écrit un commentaire
  let postFollowedId = json?.postFollowedId;


  // On récupère la date actuelle et on créé un nouveau postId
  var options = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'}
  let date = new Date().toLocaleDateString([], options);
  let postId = parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(8).toString().replace(".", ""));



  // S'assure que l'image du post est nulle si aucune url n'a été fournie
  let postImg = null;
  if(req.file?.filename !== undefined){
    postImg = `${req.protocol}://${req.get('host')}/images/${req.file?.filename}`;
  }

  //création du contenu du post à partir des infos récupérées
  const post = {
    postId: postId,
    userId: userId,
    postFollowedId: postFollowedId,
    date: date,
    postImageUrl: postImg,
    text: text
  }

  //on insère le post dans la bdd
  mysqlconnection.query(
    'INSERT INTO post SET ?', post, (error, results, fields)=>{
        if (error){
            console.log(error);
            res.json({error});
        } else {
            res.json({message:"post enregistré"});
        }
    })


    // Si le nouveau post est un commentaire, on lance des requêtes pour mettre à jour le nombre de commentaires du post référent dans la bdd
    mysqlconnection.query(
      `SELECT * FROM post WHERE postId='${postFollowedId}'`, (error, results, fields)=>{
        let commentsCount = results[0]?.comments;
        commentsCount += 1;

      mysqlconnection.query(
        `UPDATE post SET comments='${commentsCount}' WHERE postId='${postFollowedId}'`, (error, results, fields)=>{
        console.log(error);
        })
      })
    })
  };



  exports.editPost = (req, res, next) => {
    let json = JSON.parse(req.body.info);
    let text = json.text;
    
    //On récupère le userId qui fait la requête depuis les headers du token 
    const token = req.headers.authorization;
  
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, decoded) => {
          if (err) return res.sendStatus(403); //invalid token
      
    let userId = decoded.UserInfo.userId;
  
  
    // On récupère la date actuelle de modification du post
    var options = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'}
    let date = new Date().toLocaleDateString([], options);
  
  
    // S'assure que l'image du post est nulle si aucune url n'a été fournie
    let postImg = null;
    if(req.file?.filename !== undefined){
      postImg = `${req.protocol}://${req.get('host')}/images/${req.file?.filename}`;
    }
    console.log("icii"+postImg)
    // Création du contenu du post à partir des infos récupérées
    const modifPost = {
      postId: json.postId,
      modifDate: date,
      postImageUrl: postImg,
      text: text
    }
  
    // On update les informations du post
    mysqlconnection.query(
      `UPDATE post SET ? WHERE postId='${json.postId}' AND userId='${userId}'`, modifPost, (error, results, fields)=>{
          if (error){
              console.log(error);
              res.json({error});
          } else {
              res.json({message:"post modifié"});
          }
        })
       })
    };













/*


  exports.modifySauce = (req, res, next) => {
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
          req.body.name = sanitize.blacklist(req.body.name, "<>\"'/");
          req.body.manufacturer = sanitize.blacklist(req.body.manufacturer, "<>\"'/");
          req.body.description = sanitize.blacklist(req.body.description, "<>\"'/");
          req.body.mainPepper = sanitize.blacklist(req.body.mainPepper, "<>\"'/");

          const sauceObject = req.file ?
        {
          ...JSON.parse(req.body.sauce),
          imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
          if (req.file){
            const filename = sauce.imageUrl.split('/images/')[1];
              fs.unlink(`images/${filename}`, () => {
                Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
              .then(() => res.status(200).json({ message: 'Sauce modifié !'}))
              .catch(error => res.status(400).json({ error }));
            });
          } else {
            Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce modifié !'}))
          .catch(error => res.status(400).json({ error }));
          }
        }
      }
    )
  };

*/
  exports.deletePost = (req, res, next) => {

    res.json({message:"post supprimé"});
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






exports.getAllPosts = (req, res, next) => {
//la requête SQL
mysqlconnection.query(
    'SELECT name, firstName, profilImageUrl, postId, postFollowedId, comments, modifDate, postImageUrl, post.likes, post.date, post.text, post.Count, user.userId, indexlikes.hasLiked FROM post INNER JOIN user ON post.userId = user.userId LEFT JOIN indexlikes ON indexlikes.postIdLiked = post.postId', (error, results, fields)=>{
        if (error){
            console.log(error);
            res.json({error});
        } else {
            res.json(results);
        }
    })
};


exports.changeLiking = (req, res, next) => {
  let { postId, liking, likes } = req.body.info;
  console.log(postId);


  //On récupère le userId qui fait la requête depuis les headers du token 
  const token = req.headers.authorization;
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
        if (err) return res.sendStatus(403); //invalid token
  let userId = decoded.UserInfo.userId;

  // Retrouve tous les utilisateurs qui ont liké le post pour savoir si l'utilisateur à l'origine de la requête a déjà liké
  mysqlconnection.query(
    `SELECT userIdThatLiked FROM indexlikes WHERE postIdLiked = ${postId}`, (error, results, fields)=>{
      console.log(results)
      if (results.indexOf(userId) === -1){

        const like = {
          postIdLiked: postId,
          userIdThatLiked: userId,
          hasLiked: true
        }
        // Ajoute un index d'utilisateurs ayant liké le post
        mysqlconnection.query(
          `INSERT INTO indexlikes SET ?`, like, (error, results, fields)=>{
              if (error){
                  console.log(error);
                  res.json({error});
              } else {
                  console.log("--> results");
                  console.log(results);
                  res.json({message:"like fait"});
              }
          })

          // Ajoute un like au compteur de likes du post
          mysqlconnection.query(
            `UPDATE post SET likes ='${likes+1}' WHERE postId='${postId}'`, (error, results, fields)=>{
            console.log(error);
            })
      }
    })
/*

  //création du contenu du post à partir des infos récupérées
  if (liking === 1){
    addLiking();
  } else if (liking === 0){
    removeLiking();
  };
  let tata = 0;
  let tato = 1;
  //on insère le post dans la bdd
  mysqlconnection.query(
    `UPDATE indexlikes SET hasLiked='${tata}' WHERE indexlikes.userId ='${tato}'`, (error, results, fields)=>{
        if (error){
            console.log(error);
            res.json({error});
        } else {
            res.json({message:"post enregistré"});
        }
      }
    )*/}
)}


function addLiking(liking){
};


function removeLiking(liking){
  console.log(liking)
};
