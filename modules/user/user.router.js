const { endPoint } = require('../../endPoint/end.Point');
const { authen } = require('../../middleWear/authen');
const { validation } = require('../../middleWear/validation');
const { myMulter, fileValidation, HME } = require('../../services/multer');
const { displayProfile, updateprofilePic, updateprofileCover, updatePassword } = require('./controller/profile');
const {displayprofileValidation,updatePasswordValidation} = require('./user.Validation');

const router = require('express').Router();



router.get('/displayprofile',validation(displayprofileValidation),authen(endPoint.user.diplayProfile),displayProfile)
router.patch('/profile/pic',myMulter('user/profile/pic',fileValidation.image).single('image')/*,HME*/,authen(endPoint.user.diplayProfile),updateprofilePic)
router.patch('/profile/cover',myMulter('user/profile/cover',fileValidation.image).array('image',5),HME,authen(endPoint.user.diplayProfile),updateprofileCover)
router.patch('/updatePassword',validation(updatePasswordValidation),authen(endPoint.user.diplayProfile),updatePassword)

module.exports = router