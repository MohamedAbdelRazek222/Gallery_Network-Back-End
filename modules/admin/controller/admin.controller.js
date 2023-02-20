const { userModel } = require("../../../DB/model/user.model")
const sendEmail = require("../../../services/email.services")

const getAllUsers=async(req,res) => {

const users=await userModel.find({role:{$nin :['Admin',"User"]}}) 

res.json({messages:"done",users})




}

const changeRole=async(req, res)=>{

const {id}=req.params     
const {role}=req.body
const user=await userModel.findByIdAndUpdate(id,{role},{new:true})
sendEmail(user.email,`<p>admin has change u role to  ${user.role}</p>`)
}
// ------------------------------------------------------------
const blockuser=async(req, res)=>{

const {id}=req.params     
const user=await userModel.findOne({_id:id})
if (user.role == req.user.role) {
    res.status(401).json({messages:"sorry u are same role"})

}else{
await userModel.findByIdAndUpdate(user._id,{isBlocked:true})
    sendEmail(user.email,`<p>your account has blocked ${user.role}</p>`)

    res.json({messages:"done",user})


}
}

module.exports={getAllUsers,changeRole,blockuser}
