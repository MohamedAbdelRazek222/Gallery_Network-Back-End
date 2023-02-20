const Joi=require('joi');

const creatPostValidation={
body:Joi.object().required().keys({

text:Joi.string(),


})

}
const creatcommentValidation={
body:Joi.object().required().keys({

text:Joi.string().required(),


}),
params:Joi.object().required().keys({

id:Joi.string().min(24).max(24).required(),

})


}

const likeValidation={

params:Joi.object().required().keys({

id:Joi.string().min(24).max(24).required(),

})


}
const CommnetValidation={

params:Joi.object().required().keys({

id:Joi.string().min(24).max(24).required(),

})


}
const replayValidation={
    body:Joi.object().required().keys({

        text:Joi.string().required(),
        
        
        }),
params:Joi.object().required().keys({

id:Joi.string().min(24).max(24).required(),
commentId:Joi.string().min(24).max(24).required(),


})


}
const replayOnReolayValidation={
    body:Joi.object().required().keys({

        text:Joi.string().required(),
        
        
        }),
params:Joi.object().required().keys({

id:Joi.string().min(24).max(24).required(),
commentId:Joi.string().min(24).max(24).required(),
replayId:Joi.string().min(24).max(24).required(),


})


}
module.exports = {creatPostValidation,creatcommentValidation,likeValidation,replayValidation,replayOnReolayValidation,CommnetValidation}