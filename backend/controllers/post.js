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
  console.log(json)
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

  /*
    const sauceObject = JSON.parse(req.body.sauce);
  
    sauceObject.name = sanitize.blacklist(sauceObject.name, "<>\"'/");
    sauceObject.manufacturer = sanitize.blacklist(sauceObject.manufacturer, "<>\"'/");
    sauceObject.description = sanitize.blacklist(sauceObject.description, "<>\"'/");
    sauceObject.mainPepper = sanitize.blacklist(sauceObject.mainPepper, "<>\"'/");

    delete sauceObject._id;
    const sauce = new Sauce({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      likes: 0,
      dislikes: 0,
      usersLiked: [],
      usersDisliked: []
    });
    sauce.save()


      .then(() => res.status(201).json({ message: 'Post enregistré !'}))
      .catch(error => res.status(400).json({ error }));*/
    })
  };




  /*

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};


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
    'SELECT name, firstName, profilImageUrl, postId, postFollowedId, comments, modifDate, postImageUrl, post.likes, post.date, post.text, post.Count, user.userId, indexlikes.hasLiked FROM post INNER JOIN user ON post.userId = user.userId LEFT JOIN indexlikes ON indexlikes.userId = user.userId', (error, results, fields)=>{
        if (error){
            console.log(error);
            res.json({error});
        } else {
            res.json(results);
        }
    })
}




exports.changeLiking = (req, res, next) => {
    res.json({message:"requête reçue"});
  /*
    let currentId =  req.body.userId;
    let currentLike = req.body.like;

    let intCurrentLike = parseInt(currentLike);

  
    Sauce.findOne({ _id: req.params.id }).then((sauce) => {
        res.status(201).json({ message: 'Like modifié !'})
        
        if (liking === 1){
        addLiking();
      } else if (liking === 0){
        removeLiking();
      };
    })
    .catch(error => res.status(400).json({ error }));*/
  };



function addLiking(liking){
};


function removeLiking(liking){
};
