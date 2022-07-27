const express = require('express');
const router = express.Router();


const userCtrl = require('../controllers/user');
const password = require("../middleware/password");
const emailValidation = require("../middleware/emailValidation");
const auth = require('../middleware/auth');


router.post('/signup',/* password, emailValidation, */userCtrl.signup);
router.post('/login', /*emailValidation,*/ userCtrl.login);

//Routes sécurisées par middleware auth
router.get('/', auth, userCtrl.getAllUsers);
router.get('/:id', auth, userCtrl.getOneUser);


module.exports = router;