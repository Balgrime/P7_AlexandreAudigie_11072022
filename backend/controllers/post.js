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


    // On supprime l'ancienne image du dossier image seulement si une nouvelle est choisie
    if (req.file){
      mysqlconnection.query(
        `SELECT postImageUrl FROM post WHERE postId='${json.postId}' AND userId='${userId}'`, (error, results, fields)=>{
            console.log("LAAAAAAAA"+results[0].postImageUrl);
            let urlToRemove = results[0].postImageUrl;


              // S'il y a un fichier dans la requête et qu'il y avait déjà une image dans la bdd, on supprime cette dernière
              if(urlToRemove !== null){
                const filenameToRemove = urlToRemove?.split('/images/')[1];
                fs.unlink(`images/${filenameToRemove}`, (res, err) => {
                if(err) console.log('error', err);})  
              }   
          })
        }
      }

    // Création du contenu du post à partir des infos récupérées
    let modifPost = {}
    if (req.file){
      modifPost = {
        postId: json.postId,
        modifDate: date,
        postImageUrl: postImg,
        text: text
      }
    } else {
        modifPost = {
          postId: json.postId,
          modifDate: date,
          text: text
      }
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


  exports.deletePost = (req, res, next) => {
    let postId = req.body.postId;
    let postFollowedId = req.body.postFollowedId;
    //On récupère le userId qui fait la requête depuis les headers du token 
    const token = req.headers.authorization;
  
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, decoded) => {
          if (err) return res.sendStatus(403); //invalid token
      
    let userId = decoded.UserInfo.userId;


    // Prend en considération les droits administrateurs
    if(userId === 12199815){

      // Supprime l'image du post du dossier images (si elle était présente)
    mysqlconnection.query(
      `SELECT postImageUrl FROM post WHERE postId='${postId}'`, (error, results, fields)=>{
        if (error){
          console.log(error);
        } else if (results) {
          console.log(results[0]?.postImageUrl);
          let urlToRemove = results[0]?.postImageUrl;

          if(urlToRemove !== null){
            const filenameToRemove = urlToRemove?.split('/images/')[1];
            fs.unlink(`images/${filenameToRemove}`, (res, err) => {
            if(err) console.log('error', err);})  
          } 
        }
      })
      // On supprime le post correspondant au postId, seulement si le userId décodé correspond au userId qui a créé le post
      mysqlconnection.query(
        `DELETE FROM post WHERE postId='${postId}'`, (error, results, fields)=>{
          if (error){
            console.log(error);
            res.json({error});
        } else if (results !== null) {
          // Si le post deleted était un commentaire, on lance des requêtes pour mettre à jour le nombre de commentaires du post référent dans la bdd
          mysqlconnection.query(
            `SELECT * FROM post WHERE postId='${postFollowedId}'`, (error, results, fields)=>{
              let commentsCount = results[0]?.comments;
              commentsCount -= 1;

          mysqlconnection.query(
            `UPDATE post SET comments='${commentsCount}' WHERE postId='${postFollowedId}'`, (error, results, fields)=>{
            console.log(error);
            })
          })

            res.json({message:"post supprimé"});

          // Supprime les commentaires associés au post initial
          mysqlconnection.query(
            `DELETE FROM post WHERE postFollowedId='${postId}'`, (error, results, fields)=>{
              if (error) console.log(error);
          })
        }
          })


    } else {

    // Supprime l'image du post du dossier images (si elle était présente)
    mysqlconnection.query(
      `SELECT postImageUrl FROM post WHERE postId='${postId}' AND userId='${userId}'`, (error, results, fields)=>{
        if (error){
          console.log(error);
        } else if (results) {
          console.log(results[0]?.postImageUrl);
          let urlToRemove = results[0]?.postImageUrl;

          if(urlToRemove !== null){
            const filenameToRemove = urlToRemove?.split('/images/')[1];
            fs.unlink(`images/${filenameToRemove}`, (res, err) => {
            if(err) console.log('error', err);})  
          } 
        }
      })
      // On supprime le post correspondant au postId, seulement si le userId décodé correspond au userId qui a créé le post
      mysqlconnection.query(
        `DELETE FROM post WHERE postId='${postId}' AND userId='${userId}'`, (error, results, fields)=>{
          if (error){
            console.log(error);
            res.json({error});
        } else if (results !== null) {
          // Si le post deleted était un commentaire, on lance des requêtes pour mettre à jour le nombre de commentaires du post référent dans la bdd
          mysqlconnection.query(
            `SELECT * FROM post WHERE postId='${postFollowedId}'`, (error, results, fields)=>{
              let commentsCount = results[0]?.comments;
              commentsCount -= 1;

          mysqlconnection.query(
            `UPDATE post SET comments='${commentsCount}' WHERE postId='${postFollowedId}'`, (error, results, fields)=>{
            console.log(error);
            })
          })

            res.json({message:"post supprimé"});

          // Supprime les commentaires associés au post initial
          mysqlconnection.query(
            `DELETE FROM post WHERE postFollowedId='${postId}'`, (error, results, fields)=>{
              if (error) console.log(error);
          })
        }
          })
        }
        }
      )}




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
