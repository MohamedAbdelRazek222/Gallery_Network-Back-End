

const Joi=require('joi');


const displayprofileValidation={
headers:Joi.object().required().keys({
authorization:Joi.string().required()



}).options({allowUnknown:true})



}
const updatePasswordValidation={

    body:Joi.object().required().keys({
    
    oldPassword:Joi.string().pattern(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)).required(),
    newPassword:Joi.string().pattern(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)).required(),
    cpassword:Joi.string().valid(Joi.ref('newPassword')).required(),
    
    
    })
    
    
    }
module.exports = {displayprofileValidation,updatePasswordValidation}