const sendEmail = require("../../../services/email.services")
const jwt=require('jsonwebtoken')
const userModel = require("../../../DB/models/user.model")
const bcrypt=require("bcrypt")

// --------------------------------------------------------signUp

const signUp=async (req,res)=>{


try{

    const {firstName,email,password}=req.body


const newUser=new userModel({firstName,email,password})

const savedUser=await newUser.save()

const token=jwt.sign({_id:savedUser._id},process.env.emailToken,{expiresIn:5*60})
const link=`${req.protocol}://${req.headers.host}/api/v1/user/confirmEmail/${token}`
const link2=`${req.protocol}://${req.headers.host}/api/v1/user/refreshEmail/${savedUser._id}`
const message=`<a href=${link}> please confirm your email </a><br>
               <a href=${link2}> resend confirmation email </a>`



// console.log(savedUser.email)
// console.log(message)
// console.log(sendEmail(savedUser.email,message))
sendEmail(savedUser.email,message)
res.status(201).json({message:"done",savedUser})

}catch(e){

    if(e.keyValue?.email){

        res.status(409).json({message:"email exists"})



    }else{

        res.status(500).json({message:"Error",e})


    }


}


}

// --------------------------------------------------------EmailConfirm

const confirmEmail=async (req,res)=>{

try{



const {token}=req.params

const decoded=jwt.verify(token,process.env.emailToken)

if(!decoded){

    res.status(400).json({message:"invalid token"})


}else{

const user=await userModel.findById(decoded._id)

if(!user){
    
    res.status(404).json({message:"invalid token id"})


}else{


if(user.confirmed){

    res.status(400).json({message:"you already confirmed "})


}else{

await userModel.findOneAndUpdate({_id:user.id},{confirmed:true})

res.status(200).json({message:" Done plz login"})

}



}

}

}catch(e){

    res.status(500).json({message:" error confirmed",e})

}

}
// --------------------------------------------refresh email

const refreshEmail=async(req,res)=>{

    const {id}=req.params
    
    const user=await userModel.findOne({id}).select('confirmEmail email')
        
    if(!user){
    
    res.status(404).json({message:"invalid account"})
    
    }else{
    
    if(user.confirmEmail){
    
        res.status(400).json({message:"already confirmed"})
    
    
    }else{
        
        const token=jwt.sign({_id:user._id},process.env.emailToken,{expiresIn:5*60})
    
        const link=`${req.protocol}://${req.headers.host}/api/v1/user/confirmEmail/${token}  `
        const link2=`${req.protocol}://${req.headers.host}/api/v1/user/refreshEmail/${user._id}  `
        const message=`<a href=${link}>plz confirm your email </a> <br> <a href=${link2}>resend confirmintion email </a>`
   
 
       sendEmail(user.email,message)
       await userModel.findByIdAndUpdate({_id:user.id})

   res.status(400).json({message:"done check u email"})
   

  
    }
    
    
    }
        
        
        }

// --------------------------------------------login
const login = async (req, res) => {

    const {email,password}=req.body

    const user=await userModel.findOne({email})

    if(!user){


        res.status(404).json({message:"invalid email account"})
        
        
        }else{
            if(!user.confirmed){

                res.status(404).json({message:"plz confirm u email first"})
            
            
            
            }else{
            
            // console.log(user.blocked);
                if (user.blocked) {
    
                    res.status(400).json({message:"sorry u account is Blocked"})
                
                
                }else{

                    const match=await bcrypt.compare(password,user.password)

                    if(!match){
    
                        res.status(400).json({message:"email password mismatch"})
                    
                    
                    }else{

                       const token=jwt.sign({_id:user._id,isLogged:true},process.env.logingtoken,{expiresIn:'3h'}) 

                       res.status(200).json({message:"login suceess",token})

                    }


                }


            
            }




        }




}
// --------------------------------------------------------------------Update profile 

const updateProfile =async (req,res) => {

const {email,newpassword}=req.body

const user=await userModel.findOne({email})

if(!user){
    res.status(404).json({message:"in-valid email"})
    
    }else{


        const hashPassword=await bcrypt.hash(newpassword,parseInt(process.env.saltRounds)) 
        const match=await bcrypt.compare(hashPassword,user.password)
        // console.log(match);
        // console.log(user.password);
        // console.log(hashPassword);
if(!match){

    const code=Math.floor(Math.random()*(9999-1000+1)+1000)

await userModel.findByIdAndUpdate({_id:user._id},{email,password:hashPassword})

sendEmail(user.email,`<P>use this code to update u passowrd ${code} </p>`)
res.status(200).json({message:"done",code})
}else{

    res.status(404).json({message:"sorry same password"})

}


    }

}

// ---------------------------------------------------------deleteUser

const deleteUser=async (req, res) => {


const {_id}=req.user



await userModel.findOneAndDelete({_id:_id},{new:true})


res.json({message:"done"})




}
// -------------------------------------------------------addProfilePic
const addProfilePic=async (req,res)=>{
    try{
    
    if(req.fileErr){
    
    res.status(400).json({message:"in-valid format"})
    
    }else{
    
       const imageUrl=`${req.finalDestination}/${req.file.filename}`
    const user=await userModel.findByIdAndUpdate({_id:req.user._id},{profile_Pic:imageUrl},{new:true})
    res.status(200).json({message:"done"})
    
    }
    
    
    
    
    }catch(err ){
    
        res.status(500).json({message:"error",err})
    
    
    }
    
    
    
    }

    //-------------------------------------------------------------addCoverPic 
    const addCoverPic=async (req,res)=>{
        try{
        
        if(req.fileErr){
        
        res.status(400).json({message:"in-valid format"})
        
        }else{
        
           const imageUrl=[]
           req.files.forEach(file =>{
        
        imageUrl.push(`${req.finalDestination}/${file.filename}`)
        
        
           })
        const user=await userModel.findByIdAndUpdate({_id:req.user._id},{cover_Pic:imageUrl},{new:true})
        res.status(200).json({message:"done"})
        
        }
        
        
        
        
        }catch(err ){
        
            res.status(500).json({message:"error",err})
        
        
        
        
        }
        
        
        
        
        }


    //------------------------------------------------------------- forgetPassword + send code
const sendCode=async (req, res) =>{

const {email}=req.body

const user=await userModel.findOne({email})
if(!user){
    res.status(404).json({message:"in-valid email"})
    
    }else{

        const code=Math.floor(Math.random()*(9999-1000+1)+1000)

        await userModel.findByIdAndUpdate({_id:user._id},{code})


        res.status(200).json({message:"done",code})




    }
 
}


const forgetPassword=async (req,res) => {

const {email,newpassword,code}=req.body

const user=await userModel.findOne({email})
if(!user){
    res.status(404).json({message:"in-valid email"})
    
    }else{

        if(user.code !=code){

            res.status(404).json({message:"invalid code"})
            
                }else{


const hashPassword=await bcrypt.hash(newpassword,parseInt(process.env.saltRounds))

await userModel.findByIdAndUpdate({_id:user._id},{password:hashPassword,code:' '})
res.json({message:"done"})


                }



    }
    



}

// ------------------------------------------------------Soft_delete
const Soft_delete=async (req, res) => {

const {id}=req.params

const user=await userModel.findOne({_id:id})
// console.log(req.user);
if(user.role == req.user.role){
    res.status(401).json({messages:"sorry u are same role"})



}else{

    await userModel.findByIdAndUpdate({_id:user._id},{isDeleted:true})


    res.json({messages:"deleted"})

}


}
















module.exports = {signUp,confirmEmail,refreshEmail,login,updateProfile,deleteUser,addProfilePic,addProfilePic,addCoverPic,sendCode,forgetPassword,Soft_delete}