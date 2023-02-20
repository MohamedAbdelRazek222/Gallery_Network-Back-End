const { userModel } = require("../../../DB/model/user.model")
const sendEmail = require("../../../services/email.services")

const getAllUsers=async(req,res) => {

// const users=await userModel.find({role:{$nin :['Admin',"User"]}}) //دي يعني مبتساويس الاتنين دول
const users=await userModel.find({role:{$nin :['Admin',"User"]}}) //دي يعني بيساوي الاتنين دول
// const users=await userModel.find({$or:[{role:'Admin'},{age:{$gt : 30}}]}) //or دي 
// const users=await userModel.find({$or:[{role:'Admin'},{age:{$gte : 30}}]}) //gte يعني اكبر من او يساوي
// const users=await userModel.find({$or:[{role:'Admin'},{age:{$lte : 30}}]}) //gte يعني اقل من او يساوي


res.json({messages:"done",users})




}

const changeRole=async(req, res)=>{

const {id}=req.params //دي الي بيشاور علي المتغير
const {role}=req.body
const user=await userModel.findByIdAndUpdate(id,{role},{new:true})
sendEmail(user.email,`<p>admin has change u role to  ${user.role}</p>`)
}
// ------------------------------------------------------------
const blockuser=async(req, res)=>{

const {id}=req.params //دي الي بيشاور علي المتغير
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