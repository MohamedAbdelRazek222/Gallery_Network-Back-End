const Joi=require('joi')

const signUpValidation={

    body:Joi.object().required().keys({
    firstName:Joi.string().required().pattern(new RegExp(/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/)),
    email:Joi.string().email().required(),
    password:Joi.string().pattern(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)).required(),
    cpassword:Joi.string().valid(Joi.ref('password')).required()
    




})

}
const loginValidation={

    body:Joi.object().required().keys({
    email:Joi.string().email().required(),
    password:Joi.string().pattern(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)).required(),





})

}
const updateProfileValidation={

    body:Joi.object().required().keys({
    email:Joi.string().email().required(),
    newpassword:Joi.string().pattern(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)).required(),
    cpassword:Joi.string().valid(Joi.ref('newpassword')).required()





})


}
const sendCodeValidation={

    body:Joi.object().required().keys({
    email:Joi.string().email().required(),




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
const deleteUserValidation={

    params:Joi.object().required().keys({

id:Joi.string().required().min(24).max(24)



})
}

module.exports={signUpValidation,loginValidation,updateProfileValidation,sendCodeValidation,forgetPasswordValidation,deleteUserValidation}