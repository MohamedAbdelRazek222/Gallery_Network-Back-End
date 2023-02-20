

const mongoose = require('mongoose');
const { commentModel } = require('./comment.model');
// const bcrypt = require('bcrypt');
const { userModel } = require('./user.model');

const postSchema=new mongoose.Schema({

text:String,
image:{
type:Array,
required:true,

},
createdBy:{
type:mongoose.Schema.Types.ObjectId,
ref:'user',
required:true


},
likes:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',

}],
share:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
}],
isdeleted:{

type:Boolean,
default:false,

},
deletedBy:{

    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
},
comments:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'comment'
}]




},{timestamps:true})




const postModel=mongoose.model('post',postSchema)

module.exports ={postModel}