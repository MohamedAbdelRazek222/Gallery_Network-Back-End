


const { commentModel } = require("../../../DB/models/comment.model")
const productModel = require("../../../DB/models/product.model")


// -----------------------------------------------------Add comment
const addcomment=async(req,res)=>{

const {comment_body}=req.body
const {id}=req.params

const findProduct=await productModel.findOne({_id:id})
if(!findProduct){

    res.status(404).json({message:"Invalid product id"})


}else{

    const newComment=new commentModel({comment_body,comment_By:req.user._id,Product_id:findProduct.id})
const saveComment=await newComment.save()

await productModel.findByIdAndUpdate({_id:findProduct.id},{$push:{comments:saveComment._id}})

res.status(200).json({message:"Done",saveComment})

}

}

// -----------------------------------------------------replaycomment

const replayCommnet=async(req,res)=>{

const {comment_body}=req.body

const {productId,commentId}=req.params


const findProduct=await productModel.findOne({_id:productId})

if(!findProduct){

    res.status(404).json({message:"Invalid product id"})

}else{

const findCommnet=await commentModel.findOne({_id:commentId})

if(!findCommnet){

    res.status(401).json({message:"invalid comment id"})


}else{

const replay=new commentModel({comment_body,comment_By:req.user._id,Product_id:findProduct.id})
const saveReplay=await replay.save()

await commentModel.findByIdAndUpdate({_id:commentId},{$push:{Replies:saveReplay._id}})
res.status(200).json({message:"Done",saveReplay})


}


}
}
// ------------------------------------------------------- Update comment 

const  Updatecomment=async (req,res)=>{

const {comment_body}=req.body
const {commentId}=req.params

const findCommnet=await commentModel.findOne({_id:commentId,comment_By:req.user._id})
if(!findCommnet){

    res.status(200).json({message:"invalid comment id"})


}else{

await commentModel.findByIdAndUpdate({_id:commentId},{comment_body:comment_body},{new:true})

res.status(200).json({message:"Done"})

}


} 
// ------------------------------------------------------- Update deleet 
const  deletecomment=async (req,res)=>{

const {commentId}=req.params
const findProductOwner=await  productModel.findOne({createdBy:req.user.id})
const findCommnet=await commentModel.findOne({_id:commentId,comment_By:req.user._id})
if(findCommnet || findProductOwner ){

    
    await commentModel.findByIdAndDelete({_id:commentId},{new:true})
    
    res.status(200).json({message:"Done"})
    
}else{
    
    res.status(200).json({message:"invalid comment id"})

}


} 
// ------------------------------------------------------- like&dis comment 

const likeAndDislikes=async (req,res)=>{



    const {commentId}=req.params

    const findComment=await commentModel.findOne({_id:commentId}) 
    
    if(!findComment){
    
        res.status(404).json({message:"Invalid product id"})
    
     
    }else{
    
    
    if(findComment.likes.includes(req.user._id)){
    
        await commentModel.findByIdAndUpdate(id,{$pull:{likes:req.user._id}})
        
        res.status(200).json({message:"dislike done"})
        
    }else{
    
        await commentModel.findByIdAndUpdate(id,{$push:{likes:req.user._id}})
        res.status(200).json({message:"like done"})
    }
    
    
    }
    



}



module.exports = {addcomment,replayCommnet,Updatecomment,deletecomment,likeAndDislikes}