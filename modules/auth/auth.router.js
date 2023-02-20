const { endPoint } = require('../../endPoint/end.Point');
const { authen } = require('../../middleWear/authen');
const { validation } = require('../../middleWear/validation');
const { signUpValidation, signInValidation, forgetPasswordValidation, sendCodeValidation } = require('./auth.validation');
const { signup, confirmEmail, login, refreshEmail, sendCode, forgetPassword, logout } = require('./controller/registeration');

const router = require('express').Router();
router.post('/signup',validation(signUpValidation),signup)
router.post('/login',validation(signInValidation),login)
router.patch('/logout',authen(endPoint.user.logOut),logout)
router.get('/confirmEmail/:token',confirmEmail)
router.get('/refreshEmail/:token',refreshEmail)

router.post('/sendCode',validation(sendCodeValidation),sendCode)
router.post('/forgetPassword',validation(forgetPasswordValidation),forgetPassword)




module.exports = router