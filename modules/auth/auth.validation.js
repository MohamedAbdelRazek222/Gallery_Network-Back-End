const Joi=require('joi')


const signUpValidation={

body:Joi.object().required().keys({

userName:Joi.string().required().pattern(new RegExp(/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/)),
email:Joi.string().email().required(),
age:Joi.number().min(18).required(),
gender:Joi.valid('male','female').required(),
password:Joi.string().pattern(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)).required(),
cpassword:Joi.string().valid(Joi.ref('password')).required()


})


}
const signInValidation={

body:Joi.object().required().keys({

email:Joi.string().email().required(),
password:Joi.string().pattern(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)).required(),



})


}
const forgetPasswordValidation={

body:Joi.object().required().keys({

email:Joi.string().email().required(),
newpassword:Joi.string().pattern(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)).required(),
cpassword:Joi.string().valid(Joi.ref('newpassword')).required(),
code:Joi.string().required()


})


}
const sendCodeValidation={

body:Joi.object().required().keys({

email:Joi.string().email().required(),


})


}
const confirmEmailValidation={

params:Joi.object().required().keys({

token:Joi.string().required(),



})


}

module.exports={signUpValidation,signInValidation,confirmEmailValidation,forgetPasswordValidation,sendCodeValidation}