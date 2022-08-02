const express = require('express');
const router = express.Router();


const userCtrl = require('../controllers/user');
const password = require("../middleware/password");
const emailValidation = require("../middleware/emailValidation");
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Routes non sécurisées par middleware auth
router.post('/signup', password, emailValidation, userCtrl.signup);
router.post('/login', emailValidation, userCtrl.login);

//Routes sécurisées par middleware auth
router.delete('/logout', auth, userCtrl.logout);
router.get('/', auth, userCtrl.getAllUsers);
router.get('/:id', auth, userCtrl.getOneUser);
router.delete('/Delete', auth, userCtrl.deleteUser);
router.put('/Edit', auth, multer, userCtrl.editUser);

module.exports = router;