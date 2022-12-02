const { endpoint } = require('../../endPoint/endPoint');
const { authen } = require('../../middleWear/authen');
const { validation } = require('../../middleWear/validation');
const { myMulter, fileValidation, HME } = require('../../services/multer.services');
const { signUp, confirmEmail, refreshEmail, login, updateProfile, deleteUser, addProfilePic, addCoverPic, sendCode, forgetPassword, Soft_delete } = require('./controller/user.controller');
const { signUpValidation, loginValidation, updateProfileValidation, sendCodeValidation, forgetPasswordValidation, deleteUserValidation } = require('./user.valiadation');

const router = require('express').Router();



router.post('/signUp',validation(signUpValidation),signUp)
router.post('/login',validation(loginValidation),login)
router.get('/confirmEmail/:token',confirmEmail)
router.get('/refreshEmail/:token',refreshEmail)

router.patch('/updateProfile',authen(endpoint.users.update),validation(updateProfileValidation),updateProfile)
router.delete('/deleteUser',authen(endpoint.users.update),deleteUser)

router.patch('/profile/pic',myMulter('user/profile/pic',fileValidation.image).single('image'),authen(endpoint.users.addPic),addProfilePic)
router.patch('/profile/cover',myMulter('user/profile/cover',fileValidation.image).array('image',5),HME,authen(endpoint.users.addPic),addCoverPic)

router.post('/sendCode',validation(sendCodeValidation),sendCode)
router.post('/forgetPassword',validation(forgetPasswordValidation),forgetPassword)
router.patch('/softDelete/:id',validation(deleteUserValidation),authen(endpoint.users.deleteUser),Soft_delete)


module.exports = router