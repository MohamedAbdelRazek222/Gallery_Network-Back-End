const { commentModel } = require("../../../DB/model/comment.model")
const { postModel } = require("../../../DB/model/post.model")



const createcomment=async(req,res) => {

const {text}=req.body
const {id}=req.params
const {_id}=req.user


const findPost=await postModel.findOne({_id:id})
if(!findPost){

res.status(404).json({message:"Invalid post id"})


}else{

    const newComment=new commentModel({text,createdBy:_id,postId:findPost._id})
const saveComment=await newComment.save()
await postModel.findByIdAndUpdate({_id:findPost._id},{$push:{comments:saveComment._id}})
res.status(200).json({message:"Done",saveComment})
}
}
// -----------------------------------------------------
const replyOnComment=async(req,res) => {

 const {text}=req.body
const {id,commentId}=req.params
const {_id}=req.user



const findPost=await postModel.findOne({_id:id})
if(!findPost){

res.status(404).json({message:"Invalid post id"})


}else{

    const comment=await commentModel.findOne({_id:commentId,postId:findPost._id})
if(!comment){




    res.status(200).json({message:"invalid comment id"})

}else{
    const newComment=new commentModel({text,createdBy:_id,postId:findPost._id})
const saveComment=await newComment.save()
await commentModel.findByIdAndUpdate({_id:commentId},{$push:{replay:saveComment._id}})
res.status(200).json({message:"Done",saveComment})

}



}


}

// ----------------------------------------------------------
const likeCommmet=async(req, res)=>{


    await commentModel.findByIdAndUpdate(req.params.id,{$push:{likes:req.user._id}})
    
    res.status(200).json({message:"done"})
    
    
    }
// -----------------------------------------------------

const unlikeCommnet=async(req, res)=>{


    await commentModel.findByIdAndUpdate(req.params.id,{$pull:{likes:req.user._id}})
    
    res.status(200).json({message:"done"})
    
    
    }





module.exports = {createcomment,replyOnComment,likeCommmet,unlikeCommnet}
