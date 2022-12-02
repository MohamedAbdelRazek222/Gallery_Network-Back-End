const Joi=require('joi')

const addcommentValidation={

body:Joi.object().required().keys({

comment_body:Joi.string().required()

}),
params:Joi.object().required().keys({

id:Joi.string().required()



})





}
const replayValidation={
    body:Joi.object().required().keys({

        comment_body:Joi.string().required(),
        
        
        }),
params:Joi.object().required().keys({

    commentId:Joi.string().min(24).max(24).required(),
    productId:Joi.string().min(24).max(24).required(),


})


}
const UpdatecommentValidation={
    body:Joi.object().required().keys({

        comment_body:Joi.string().required(),
        
        
        })

}

module.exports = {addcommentValidation,replayValidation,UpdatecommentValidation}