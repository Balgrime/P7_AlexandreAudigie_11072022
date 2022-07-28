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
  console.log("requête reçue");
  console.log(req.body);

  let textBefore = req.body.text;
  let text = sanitize.blacklist(textBefore, "<>\"'/");

  let userId = req.body.userId;
  console.log(text)
  console.log(userId)
  let postFollowedId = req.body?.postFollowedId;

  var options = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'}
  let date = new Date().toLocaleDateString([], options);

  let postId = parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(8).toString().replace(".", ""))
  console.log(postId);


  const post = {
    postId: postId,
    userId: userId,
    postFollowedId: postFollowedId,
    date: date,
    text: text
  }

  mysqlconnection.query(
    'INSERT INTO post SET ?', post, (error, results, fields)=>{
        if (error){
            console.log(error);
            res.json({error});
        } else {
            console.log("--> results");
            console.log(results);
            res.json({message:"post enregistré"});
        }
    })
    mysqlconnection.query(
      `SELECT * FROM post WHERE postId='${postFollowedId}'`, (error, results, fields)=>{

        let commentsCount = results[0]?.comments;
        commentsCount += 1;
        console.log(commentsCount);

      mysqlconnection.query(
        `UPDATE post SET comments='${commentsCount}' WHERE postId='${postFollowedId}'`, (error, results, fields)=>{
        console.log(results);
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


  exports.deleteSauce = (req, res, next) => {
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
    )
  };

*/

exports.getAllPosts = (req, res, next) => {
//la requête SQL
mysqlconnection.query(
    'SELECT * FROM post',  (error, results, fields)=>{
        if (error){
            console.log(error);
            res.json({error});
        } else {
            console.log("--> results");
            console.log(results);
            res.json(results);
        }
    })
}


/*

exports.changeLike = (req, res, next) => {
    let currentId =  req.body.userId;
    let currentLike = req.body.like;

    let intCurrentLike = parseInt(currentLike);

  
    Sauce.findOne({ _id: req.params.id }).then((sauce) => {
        res.status(201).json({ message: 'Like modifié !'})
        
        if (intCurrentLike === 1){
        addLiking(sauce, currentId);
        sauce.save();

      } else if (intCurrentLike === 0){
        removeLiking(sauce, currentId);
        sauce.save();

      } else if (intCurrentLike === -1){
        addDisliking(sauce, currentId);
        sauce.save();

      };
    })
    .catch(error => res.status(400).json({ error }));
  };



function addLiking(sauce, currentId){
  if(sauce.usersLiked.indexOf(currentId) === -1 && sauce.usersDisliked.indexOf(currentId) === -1){
    sauce.likes += 1;
    sauce.usersLiked.push(currentId);
  } else if (sauce.usersLiked.indexOf(currentId) === -1 && sauce.usersDisliked.indexOf(currentId) !== -1){
    removeLiking(sauce, currentId);
    sauce.likes += 1;
    sauce.usersLiked.push(currentId);
  };
};


function addDisliking(sauce, currentId){
  if(sauce.usersLiked.indexOf(currentId) === -1 && sauce.usersDisliked.indexOf(currentId) === -1){
    sauce.dislikes += 1;
    sauce.usersDisliked.push(currentId);
  } else if (sauce.usersLiked.indexOf(currentId) !== -1 && sauce.usersDisliked.indexOf(currentId) === -1){
    removeLiking(sauce, currentId);
    sauce.dislikes += 1;
    sauce.usersDisliked.push(currentId);
  };
};



function removeLiking(sauce, currentId){
  if(sauce.usersLiked.indexOf(currentId) !== -1){
    sauce.likes -= 1;
    let positionUser = sauce.usersLiked.indexOf(currentId);
    sauce.usersLiked.splice(positionUser, 1);
  };
  if (sauce.usersDisliked.indexOf(currentId) !== -1){
    sauce.dislikes -= 1;
    let positionUser = sauce.usersDisliked.indexOf(currentId);
    sauce.usersDisliked.splice(positionUser, 1);
  };
};
*/