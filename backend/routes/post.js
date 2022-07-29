const express = require('express');
const router = express.Router();


const sauceCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


router.get('/', auth, sauceCtrl.getAllPosts);

//router.get('/:id', auth, sauceCtrl.getOneSauce);
router.post('/', auth, /*multer,*/ sauceCtrl.createPost);
/*router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, sauceCtrl.changeLike);
*/
module.exports = router;