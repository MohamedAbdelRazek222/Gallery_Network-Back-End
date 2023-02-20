const { userModel } = require("../../../DB/model/user.model")
const jwt=require("jsonwebtoken")
const sendEmail = require("../../../services/email.services")
const bcrypt=require('bcrypt')

const signup=async (req,res)=>{

try{

const {userName,email,password,age,gender}=req.body


const newUser=new userModel({userName,email,password,age,gender})
const savedUser=await newUser.save()
const token=jwt.sign({_id:savedUser._id},process.env.emailToken,{expiresIn:5*60})
const link=`${req.protocol}://${req.headers.host}/api/v1/auth/confirmEmail/${token}  `
const link2=`${req.protocol}://${req.headers.host}/api/v1/auth/refreshEmail/${savedUser._id}  `
const message=`<a href=${link}>plz confirm your email </a> <br> <a href=${link2}>resend confirmintion email </a>`
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




const confirmEmail=async(req,res)=>{

try{

    const {token}=req.params
    const decoded=jwt.verify(token,process.env.emailToken)
    
    if(!decoded){
    
    res.status(400).json({message:"invalid token"})
    
    
    }else{
    
    
    const user=await userModel.findById(decoded._id).select('confirmEmail')
    
    if(!user){
    
        res.status(404).json({message:"invalid token id"})
    
    
    }else{
    
    if(user.confirmEmail){
    
        res.status(400).json({message:"ypu already confirmed "})
    
    
    }else{
    
    await userModel.findOneAndUpdate({_id:user.id},{confirmEmail:true})
    res.status(200).json({message:" Done plz lgin"})
    
    }
    
    
    }
    
    }
}catch(e){

    res.status(500).json({message:" error confirmed",e})


}





}

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

    const link=`${req.protocol}://${req.headers.host}/api/v1/auth/confirmEmail/${token}  `
    const link2=`${req.protocol}://${req.headers.host}/api/v1/auth/refreshEmail/${user._id}  `
    const message=`<a href=${link}>plz confirm your email </a> <br> <a href=${link2}>resend confirmintion email </a>`
sendEmail(user.email,message)
res.status(400).json({message:"done check u email"})

}


}
    
    
    }
const login = async (req, res) => {


const {email,password}=req.body

const user=await userModel.findOne({email})

if(!user){


res.status(404).json({message:"invalid email account"})


}else{

if(!user.confirmEmail){

    res.status(404).json({message:"plz confirm u email first"})



}else{

if (user.isBlocked) {
    
    res.status(400).json({message:"sorry u account is Blocked"})


}else{

    
    const match=await bcrypt.compare(password,user.password)
    if(!match){
    
        res.status(400).json({message:"email password mismatch"})
    
    
    }else{
    
    const token=jwt.sign({_id:user._id,isLogged:true},process.env.loginToken,{expiresIn:'3h'})
    await userModel.findByIdAndUpdate({_id:user._id},{online:true})
        res.status(200).json({message:"login suceess",token})


}



}

}

}


}

// ---------------------------------------------------------------------

const logout = async (req, res) => {


    
    const user=await userModel.findByIdAndUpdate(req.user.id,{online:false,lastSeen:Date.now()})
    res.json({message:'Logout Done'})

    
    }

// ---------------------------------------------------------------------
const sendCode=async (req,res)=>{

const {email}=req.body
const user=await userModel.findOne({email})
if(!user){
res.status(404).json({message:"in-valid email"})

}else{

const code=Math.floor(Math.random()*(9999-1000+1)+1000)

await userModel.findByIdAndUpdate({_id:user._id},{code})

sendEmail(user.email,`<P>use this code to update u passowrd ${code} </p>`)
res.status(200).json({message:"done",code})
}


}
// --------------------------------------------------------------------------
const forgetPassword=async (req,res)=>{

const {code,email,newpassword}=req.body
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




module.exports = {signup,confirmEmail,login,refreshEmail,sendCode,forgetPassword,logout}