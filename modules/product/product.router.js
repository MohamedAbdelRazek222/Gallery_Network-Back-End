const { endpoint } = require('../../endPoint/endPoint');
const { authen } = require('../../middleWear/authen');
const { validation } = require('../../middleWear/validation');
const { myMulter, fileValidation } = require('../../services/multer.services');
const { addproduct, Updateproduct, Deleteproduct, Softdelete, likeAnddislike, addProductToWishList, Hidden, getAllUser } = require('./controller/product.controller');
const { addProductValidation, UpdateproductValidation, likeValidation, addToWishValidation } = require('./product.validation');

const router = require('express').Router();



router.post('/',
myMulter('/createProduct',fileValidation.image).array('image',5),
authen(endpoint.product.addProduct),
validation(addProductValidation),
addproduct)

router.patch('/Updateproduct/:id',
authen(endpoint.product.Updateproduct),
validation(UpdateproductValidation),
Updateproduct)

router.delete('/Deleteproduct/:id',
authen(endpoint.product.deleteproduct),
Deleteproduct)

router.delete('/Softdelete/:id',
authen(endpoint.product.deleteproduct),
Softdelete)

router.delete('/Hidden/:id',
authen(endpoint.product.deleteproduct),
Hidden)

router.patch('/likeAnddislike/:id',validation(likeValidation),
authen(endpoint.product.like),likeAnddislike)

router.patch('/addProductToWishList/:id',validation(addToWishValidation),
authen(endpoint.product.addProduct),addProductToWishList)

router.get('/getAllUser',getAllUser)


module.exports=router