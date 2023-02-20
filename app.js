/*1
*** user posts report هنعمل 3 جداول****
***report:report  دا مثلا لو حد بينزل محتوي سئ تعمل فيه  ****
*********************************************
***محتوي الجداول****
-user:userName,email,fname,password,phone,age,gender(defualt male),confirm,role,profilePic,coverPic,socialLinks,gallery,story,follower,accountStatus,pdfLink
-posts:title,desc,image,userId(objectId,ref:user),tags:array,like:array,replay,isBlocked***
-report:type:String,reporter:objectId user,accountId:objectId user,postId:objectId post,message,status:boolean
***********************************************






*/
require('dotenv').config()
const express = require('express')
const { connectDB } = require('./DB/connection')
const { userRouter, authRouter, postRouter, adminRouter } = require('./index.Router')
const app = express()
const cors=require('cors')
const port = 3000
var whitelist = ['http://example1.com', 'http://example2.com']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
 
app.use(cors(corsOptions))

app.use(express.json())
const path=require('path')

app.use('api/v1/uploads',express.static(path.join(__dirname, './uploads')))

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/user',userRouter)
app.use('/api/v1/post',postRouter)
app.use('/api/v1/admin',adminRouter)
app.get('/',(req,res)=>{
    const QRCode = require('qrcode')

    QRCode.toDataURL(`<a href='https//:www.google.com'>/a>`, function (err, url) {

if(err){
    res.status(400).json({message: "qr error"})


}else{
    console.log(url)

    res.status(400).json({message: "qr ",url})

}


      })




})

connectDB()
app.listen(port, () => console.log(`Example app listening on port ${port}!`))