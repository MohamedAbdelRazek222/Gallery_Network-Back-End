require('dotenv').config()
const express = require('express')
const connectDB = require('./DB/connection')
const { commentRouter, productRouter, userRouter } = require('./index.Router')
const app = express()
const cors=require('cors')
const port = process.env.port
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

app.use('/api/v1/user',userRouter)
app.use('/api/v1/product',productRouter)
app.use('/api/v1/commnet',commentRouter)

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