const { endpoint } = require('../../endPoint/endPoint');
const { authen } = require('../../middleWear/authen');
const { validation } = require('../../middleWear/validation');
const { addcommentValidation, replayValidation, UpdatecommentValidation } = require('./comment.validation');
const { addcomment, replayCommnet, Updatecomment, deletecomment, likeAndDislikes } = require('./controller/comment.controller');

const router = require('express').Router();



router.patch('/addcomment/:id',validation(addcommentValidation),authen(endpoint.comment.addcomment),addcomment)
router.patch('/replayCommnet/comment/:commentId/replay/:productId',validation(replayValidation),authen(endpoint.comment.addcomment),replayCommnet)
router.patch('/updatecomment/:commentId',validation(UpdatecommentValidation),authen(endpoint.comment.updateomment),Updatecomment)
router.delete('/deletecomment/:commentId',authen(endpoint.comment.updateomment),deletecomment)
router.patch('/likeAndDislikes/:commentId',authen(endpoint.comment.updateomment),likeAndDislikes)



module.exports=router