const Sauce = require('../models/Sauce');

const sanitize = require("validator");

const fs = require('fs');


exports.createSauce = (req, res, next) => {
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
      .then(() => res.status(201).json({ message: 'Sauce enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  };



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



exports.getAllSauces = (req, res, next) => {
  Sauce.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};




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