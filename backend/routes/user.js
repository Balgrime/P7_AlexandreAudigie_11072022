const express = require('express');
const router = express.Router();


const userCtrl = require('../controllers/user');
const password = require("../middleware/password");
const emailValidation = require("../middleware/emailValidation");


router.post('/signup', password, emailValidation, userCtrl.signup);
//router.post('/login', emailValidation, userCtrl.login);
//ajouter controles sur routes ci dessous
router.get('/', userCtrl.getAllUsers);
//router.get('/:id', userCtrl.getOneUser);


module.exports = router;