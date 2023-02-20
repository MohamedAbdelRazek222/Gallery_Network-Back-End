

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema=new mongoose.Schema({

userName:{

type:String,
required:true,
    },
lastName:{

type:String,
    },
firstName:{

type:String,
    },
email:{

type:String,
required:true,
unique:true
    },
password:{

type:String,
required:true,
    },
phone:{

type:String,
    },
age:{

type:Number,
required:true,
    },
gender:{

type:String,
enum:['male','female'],
default:'male',
required:true,

    },
profilePic:{

type:String,
    },
coverPic:{

type:Array,
    },
gallery:{

type:Array,
    },
confirmEmail:{

type:Boolean,
required:true,
default:false
    },
confirmEmail:{

type:Boolean,

default:false
    },
online:{

type:Boolean,
default:false
    },
isBlocked:{

type:String,
    },
role:{

type:String,
default:'user'
    },
socialLinks:{

type:Array,

    },
followers:[{

type:mongoose.Schema.Types.ObjectId,
ref:'user'
    }],
following:[{

type:mongoose.Schema.Types.ObjectId,
ref:'user'
    }],
    pdfLink:{


        type:String,
    },
    code:String ,
    lastSeen:String



},{timestamps:true})



userSchema.pre('save',async function (next){

this.password=await bcrypt.hash(this.password,parseInt(process.env.saltRounds)) 

next()


})

//version دا هنا بيغيرال 

userSchema.pre('findOneAndUpdate',async function (next){

console.log({model:this.model});//user  اسم الموديل الي هو هنا 
console.log({Query:this.getQuery()});//  id وهنا انت بتدور بايه وهنا انت بتدور بال

const hookData=await this.model.findOne(this.getQuery()).select("__v")
console.log(hookData);
this.set({__v:hookData.__v+1})

next()
})

const userModel=mongoose.model('user',userSchema)

module.exports ={userModel}