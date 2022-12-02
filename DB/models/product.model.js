const { default: mongoose } = require("mongoose");


const productSchema=new mongoose.Schema({

product_title:{

    type:String,
    required:true
},
produect_desc:{

type:String,

},
product_price:{

type:Number,
required:true


},
likes:[{

type:mongoose.Schema.Types.ObjectId,
ref:'user'

}],
createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
    required:true

},
Hidden:{

type:Boolean,
default:false

},
comments:[{

type:mongoose.Schema.Types.ObjectId,
ref:'comment'


}],
IsDeleted:{
type:Boolean,
default:false

},
Wishlists :[{

    type:mongoose.Schema.Types.ObjectId,
    ref:'user'

}],
product_Pic:{

    type:Array
    
    },





},{timestamp:true})


const productModel=mongoose.model('product',productSchema)
module.exports=productModel