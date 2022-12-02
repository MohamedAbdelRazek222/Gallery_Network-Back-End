
const Joi=require('joi');


const addProductValidation={

body:Joi.object().required().keys({

    product_title:Joi.string().required().min(5),
    produect_desc:Joi.string(),
    product_price:Joi.number().required()

})


}
const UpdateproductValidation={

body:Joi.object().required().keys({

    product_title:Joi.string().required().min(5),
    product_price:Joi.number().required()

})


}
const likeValidation={

    params:Joi.object().required().keys({
    
    id:Joi.string().min(24).max(24).required(),
    
    })
    
    
    }
const addToWishValidation={

    params:Joi.object().required().keys({
    
    id:Joi.string().min(24).max(24).required(),
    
    })
    
    
    }
module.exports={addProductValidation,UpdateproductValidation,likeValidation,addToWishValidation}