const { endPoint } = require('../../endPoint/end.Point');
const { authen } = require('../../middleWear/authen');
const { validation } = require('../../middleWear/validation');
const { myMulter, fileValidation } = require('../../services/multer');
const { createcomment, replyOnComment, replyOnReplayOnComment, likeCommmet, unlikeCommnet } = require('./controller/comment.controller');
const {createPost, displayAllPost, likePost, unlikePost} = require('./controller/post.contoller');
const { creatPostValidation, creatcommentValidation, likeValidation, replayValidation, replayOnReolayValidation, CommnetValidation } = require('./post.validation');

const router = require('express').Router();

router.post('/',
myMulter('/post',fileValidation.image).array('image',5),
authen(endPoint.post.createofthePost),
validation(creatPostValidation),createPost)

router.patch('/createcomment/:id',validation(creatcommentValidation),
authen(endPoint.post.createofthePost),createcomment)

router.get('/displayAllPost'
,displayAllPost)


router.patch('/like/:id',validation(likeValidation),
authen(endPoint.post.createofthePost),likePost)

router.patch('/unlike/:id',validation(likeValidation),
authen(endPoint.post.createofthePost),unlikePost)


router.patch('/:id/:commentId',validation(replayValidation),
authen(endPoint.post.createofthePost),replyOnComment)


router.patch('/likeCommnet/:id',validation(CommnetValidation),
authen(endPoint.post.createofthePost),likeCommmet)

router.patch('/unlikeCommnet/:id',validation(CommnetValidation),
authen(endPoint.post.createofthePost),unlikeCommnet)


module.exports = router