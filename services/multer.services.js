const multer=require('multer');
const path=require('path');
const {nanoid}=require('nanoid')
const fs=require('fs');
const fileValidation={
image:['image/jpeg','image/png'],
pdf:['application/pdf']



}
const HME=(err,req,res,next)=>{

if(err){
res.status(404).json({message:"multer err",err})

}else{

next()


}



}
function myMulter(customPath,customValidation){

if(!customPath){

    customPath ='general'

}

const fullPath=path.join(__dirname,`../uploads/${customPath}`)

if(!fs.existsSync(fullPath)){

fs.mkdirSync(fullPath,{recursive:true})



}


    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            req.finalDestination=`uploads/${customPath}`
          cb(null,fullPath )
        },
        filename: function (req, file, cb) {
          cb(null, nanoid()+'_'+file.originalname )
        }
      })

const fileFilter=function (req, file, cb){

if(customValidation.includes(file.mimetype)){


    cb(null,true)

}else{

req.fileErr=true
cb(null,false)

}


}


      
      const upload = multer({ dest:fullPath,fileFilter,storage })

    
    return upload
    
    
}
module.exports = {myMulter,fileValidation,HME}