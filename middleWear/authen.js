

const jwt=require('jsonwebtoken');
const roles={
Admin:"admin",
User:"user",
Hr:"hr"

    
}
const { userModel } = require('../DB/model/user.model');
const authen=(accessRoles)=>{




return async(req,res,next)=>{

const headerToken=req.headers.authorization;

if( !headerToken.startsWith('Bearer ')){


res.status(400).json({message:"invalid herader token"})



}else{

const token=headerToken.split(' ')[1]
const decoded=jwt.verify(token,process.env.loginToken)

if(!decoded || !decoded.isLogged){

    res.status(400).json({message:"invalid  token"})


}else{

const finduser=await userModel.findOne({_id:decoded._id}).select('role userName email')

if(!finduser){


    res.status(404).json({message:"invalid  account id"})



}else{

if(!accessRoles.includes(finduser.role)){

    res.status(401).json({message:"not authorized"})


}

req.user=finduser
next()

}

}


}


}




}

module.exports ={authen,roles}