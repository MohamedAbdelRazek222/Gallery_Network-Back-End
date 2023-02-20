const { userModel } = require("../../../DB/model/user.model")

const bcrypt=require("bcrypt")
const e = require("express")

const displayProfile=async (req,res)=>{


const user=await userModel.findById(req.user._id)


res.status(200).json({message:"done",user})


}

const updateprofilePic=async (req,res)=>{
try{

if(req.fileErr){

res.status(400).json({message:"in-valid format"})

}else{

   const imageUrl=`${req.finalDestination}/${req.file.filename}`
const user=await userModel.findByIdAndUpdate({_id:req.user._id},{profilePic:imageUrl},{new:true})
res.status(200).json({message:"done"})

}




}catch(err ){

    res.status(500).json({message:"error",err})




}




}
const updateprofileCover=async (req,res)=>{
try{

if(req.fileErr){

res.status(400).json({message:"in-valid format"})

}else{

   const imageUrl=[]
   req.files.forEach(file =>{

imageUrl.push(`${req.finalDestination}/${file.filename}`)


   })
const user=await userModel.findByIdAndUpdate({_id:req.user._id},{coverPic:imageUrl},{new:true})
res.status(200).json({message:"done"})

}




}catch(err ){

    res.status(500).json({message:"error",err})




}




}

// +-------------------------------------------------------------
const updatePassword=async (req, res) =>{

const {oldPassword,newPassword}=req.body

if(oldPassword==newPassword){


   res.status(409).json({message:"sorry same password"})
}

const user=await userModel.findById(req.user._id)

const match=await bcrypt.compare(oldPassword,user.password)

if(!match){

res.status(400).json({message:"invalid old pass"})


}else{


const hashpassword=await bcrypt.hash(newPassword,parseInt(process.env.saltRounds))
await userModel.findByIdAndUpdate({_id:user._id},{password:hashpassword})
res.status(200).json({message:"done"})
}








}

module.exports={displayProfile,updateprofilePic,updateprofileCover,updatePassword}