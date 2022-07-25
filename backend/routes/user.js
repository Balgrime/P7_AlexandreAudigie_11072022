const express = require('express');
const router = express.Router();



const userCtrl = require('../controllers/user');

const password = require("../middleware/password");

const emailValidation = require("../middleware/emailValidation");


router.post('/', password, emailValidation, userCtrl.signup);
//router.post('/pages/Connexion', emailValidation, userCtrl.login);

module.exports = router;