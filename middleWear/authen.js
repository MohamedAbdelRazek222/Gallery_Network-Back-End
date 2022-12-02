
const jwt=require('jsonwebtoken');
const userModel = require('../DB/models/user.model');

const roles={

    Admin:"admin",
    User:"user",
    Hr:"hr"
    

}


const authen=(accessRoles)=>{


return async(req,res,next)=>{

try{

const headerToken=req.headers.authorization;


if(!headerToken.startsWith(`${process.env.BearerToken} `)){


    res.status(400).json({message:"invalid herader token"})

}else{

const token=headerToken.split(' ')[1]
const decoded=jwt.verify(token,process.env.logingtoken)


if(!decoded || !decoded.isLogged){


    res.status(400).json({message:"invalid  token"})


}else{
console.log(decoded);
const findUser=await userModel.findOne({_id:decoded._id}).select('role userName email')
if(!findUser){

    res.status(404).json({message:"invalid  account id"})


}else{

    if(!accessRoles.includes(findUser.role)){

        res.status(401).json({message:"not authorized"})
    
    
    }
    req.user=findUser
    next()

}
}
}
}catch(e){

    console.log(e);
res.json({message:"error",e})

}


}

}


module.exports = {authen,roles}