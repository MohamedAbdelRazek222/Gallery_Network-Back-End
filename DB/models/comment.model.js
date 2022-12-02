const { default: mongoose } = require("mongoose");


const commentSchema=new mongoose.Schema({

 comment_body:{


type:String,
required:true

 },
 comment_By:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'


 }],
 Product_id:[{

    type:mongoose.Schema.Types.ObjectId,
    ref:'product'


 }],
 Replies :[{

    type:mongoose.Schema.Types.ObjectId,
    ref:'comment'

 }],
 likes:[{
 
 type:mongoose.Schema.Types.ObjectId,
 ref:'user'
 
 }]






},{timestamp:true})


const commentModel=mongoose.model('comment',commentSchema)

module.exports ={commentModel}