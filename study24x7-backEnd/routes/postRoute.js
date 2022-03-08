const router = require('express').Router();
const postController = require('../controllers/post');
const checkAuth = require('../middleware/check-auth');

router.post('/create',checkAuth, postController.createPost);
router.post('/add-like', checkAuth, postController.AddLike);
router.post('/dis-like', checkAuth, postController.DisLike);
router.post('/add-comment', checkAuth, postController.AddComment);

router.get('/allPost',checkAuth, postController.AllPost);
router.get('/singlePost/:id',checkAuth, postController.SinglePost);

module.exports = router;