const mongoose=require('mongoose');



const connectDB=()=>{


return mongoose.connect(process.env.connect).then((res)=>{console.log("connected");}).catch((err)=>{console.log("error connected");})


}

module.exports = connectDB
