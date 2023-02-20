const dataMethod=['body','query','params','file','headers']


const validation=(schema)=>{

try{

    return async(req,res,next)=>{
const validationErr=[]
        dataMethod.forEach((key)=>{

if(schema[key]){


const validationRes=schema[key].validate(req[key],{abortEarly:false})

if(validationRes.error){
    validationErr.push(validationRes.error.details)
}


}



        })


if(validationErr.length>0){

res.status(400).json({message:"validation err",validationErr})


}else{


next()

}


}


}catch(e){


    res.status(500).json({message:"catch err",e})

    
}



}

module.exports ={validation}