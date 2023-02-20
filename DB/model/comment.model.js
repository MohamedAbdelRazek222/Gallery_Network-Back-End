

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { userModel } = require('./user.model');

const commentSchema=new mongoose.Schema({

text:String,

createdBy:{
type:mongoose.Schema.Types.ObjectId,
ref:'user',
required:true


},
postId:{

    type:mongoose.Schema.Types.ObjectId,
    ref:'post',

},
likes:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',

}],
replay:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'comment',

}],

isdeleted:{

type:Boolean,
default:false,

},
deletedBy:{

    type:mongoose.Schema.Types.ObjectId,
    ref:userModel,
}




},{timestamps:true})




const commentModel=mongoose.model('comment',commentSchema)

module.exports ={commentModel}