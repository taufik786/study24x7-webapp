const router = require('express').Router();
const postController = require('../controllers/post');
const checkAuth = require('../middleware/check-auth');

router.post('/create',checkAuth, postController.createPost);
router.post('/add-like', checkAuth, postController.AddLike)

router.get('/allPost',checkAuth, postController.AllPost);
// router.get('/singlePost',checkAuth, postController.SinglePost);

module.exports = router;