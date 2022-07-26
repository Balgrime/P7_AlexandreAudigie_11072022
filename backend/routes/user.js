const express = require('express');
const router = express.Router();


const userCtrl = require('../controllers/user');
const password = require("../middleware/password");
const emailValidation = require("../middleware/emailValidation");
const verifyJWT = require('../middleware/verifyJWT');
const auth = require('../middleware/auth');


router.post('/signup',/* password, emailValidation, */userCtrl.signup);
router.post('/login', /*emailValidation,*/ userCtrl.login);
//ajouter controles sur routes ci dessous
router.get('/', verifyJWT, userCtrl.getAllUsers);
router.get('/:id', verifyJWT, userCtrl.getOneUser);


module.exports = router;