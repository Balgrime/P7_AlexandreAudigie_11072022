const express = require('express');
const router = express.Router();


const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


router.get('/', auth, postCtrl.getAllPosts);

router.post('/', auth, multer, postCtrl.createPost);
//router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/Delete', postCtrl.deletePost);
router.put('/Like', auth, postCtrl.changeLiking);

module.exports = router;