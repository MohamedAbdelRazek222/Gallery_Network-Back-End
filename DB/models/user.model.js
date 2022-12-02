const { default: mongoose } = require("mongoose");
const bcrypt=require("bcrypt");

const userSchema=new mongoose.Schema({

firstName: {

    type: String,
    required: true

},
lasttName: {

    type: String,

},
email:{

    type: String,
    required: true,
    unique: true
},
password:{

    type: String,
    required: true,

},
profile_Pic:{

type:Array

},
cover_Pic:{

    type:Array,
},
confirmed:{
type:Boolean,
default: false
},
isDeleted:{

type:Boolean,
default: false
},
blocked:{
type:Boolean,
default:false
},
code:{

type:String
},
role:{

type:String,
default:'user'

}



},{timestamp:true})


userSchema.pre('save', async function (next){

    this.password=await bcrypt.hash(this.password,parseInt(process.env.saltRounds)) 

next()
})

userSchema.pre('findByIdAndUpdate',async function (next){


    
    const hookData=await this.model.findOne(this.getQuery()).select("__v")
    console.log(hookData);
    this.set({__v:hookData.__v+1})
    if(hookData.__v>3){

res.json({message:'sorry no more req'})

    }else{

        next()

    }


    })
const userModel=mongoose.model('user',userSchema);


module.exports =userModel