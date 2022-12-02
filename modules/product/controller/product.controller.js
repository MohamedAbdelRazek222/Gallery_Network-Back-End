const productModel = require("../../../DB/models/product.model");
const userModel = require("../../../DB/models/user.model");



// ---------------------------------------------addProduct

const addproduct =async(req,res)=>{

const {product_title,produect_desc,product_price}=req.body

// console.log(req.fileErr);

if(req.fileErr){

    res.status(400).json({message:"invalid format"})


}else{
    const imageUrl=[]
    req.files.forEach(file=>{
    
    imageUrl.push(`${req.finalDestination}/${file.filename}`)
    
    
    })
const addProduct=new productModel({product_title,produect_desc,product_price,product_Pic:imageUrl,createdBy:req.user._id}) 
const saveProduct=await addProduct.save()
res.status(200).json({message:"Done",saveProduct})

}



}

// ---------------------------------------------------------Update product

const Updateproduct=async (req,res)=>{

const  {product_title,product_price}=req.body
const {id}=req.params

const findProduct=await productModel.findOne({_id:id,createdBy:req.user._id})
if(!findProduct){

    res.status(404).json({message:"Invalid product id"})


}else{


await productModel.findByIdAndUpdate({_id:id},{product_title,product_price},{new:true})

res.json({message:"updated Done",productModel})


}

}
//------------------------------------------------------------Delete product

const Deleteproduct=async (req, res) => {

    const {id}=req.params

    const findProduct=await productModel.findOne({_id:id,createdBy:req.user._id})
const admin =await userModel.findOne({role:'admin'})
console.log(admin);
    if(findProduct || admin ){

        
        await productModel.findByIdAndDelete({_id:id},{new:true})
        
        res.json({message:"deleted Done"})
    }else{
        
        res.status(404).json({message:"Sorry no product founded"})



}


}

//------------------------------------------------------------ Soft delete 
const  Softdelete=async (req, res) => {



    const {id}=req.params

    const findProduct=await productModel.findOne({_id:id,createdBy:req.user._id})
const admin =await userModel.findOne({role:'admin'})
// console.log(admin);
    if(findProduct || admin ){

        
        await productModel.findByIdAndUpdate({_id:id},{IsDeleted:true},{new:true})
        
        res.json({message:"deleted Done"})
    }else{
        
        res.status(404).json({message:"Sorry no product founded"})



}




} 
//------------------------------------------------------------ like&dislike

const likeAnddislike=async (req, res) => {

const {id}=req.params

const findProduct=await productModel.findOne({_id:id}) 

if(!findProduct){

    res.status(404).json({message:"Invalid product id"})

 
}else{


if(findProduct.likes.includes(req.user._id)){

    await productModel.findByIdAndUpdate(id,{$pull:{likes:req.user._id}})
    
    res.status(200).json({message:"dislike done"})
    
}else{

    await productModel.findByIdAndUpdate(id,{$push:{likes:req.user._id}})
    res.status(200).json({message:"like done"})
}


}


}

// ----------------------------------------------------------addProductTowishList


const addProductToWishList=async(req, res)=>{

const {id}=req.params

const findProduct=await productModel.findOne({_id:id})

if(!findProduct){

    res.status(404).json({message:"Invalid product is soled"})

 
}else{

if(findProduct.Wishlists.includes(req.user._id)){


    res.status(404).json({message:"the prodcut is already in the wishlist"})


}else{

    await productModel.findByIdAndUpdate({_id:id},{$push:{Wishlists:req.user._id}})

    res.status(404).json({message:"added success"})

}




}


}
// ------------------------------------------------------hidden


const  Hidden=async (req, res) => {



    const {id}=req.params

    const findProduct=await productModel.findOne({_id:id,createdBy:req.user._id})
const admin =await userModel.findOne({role:'admin'})
    if(findProduct || admin ){

        
        await productModel.findByIdAndUpdate({_id:id},{Hidden:true},{new:true})
        
        res.json({message:"deleted Done"})
    }else{
        
        res.status(404).json({message:"Sorry no product founded"})



}




} 
// ------------------------------------------------------Get_All_users

const getAllUser=async (req, res) => {

const findProduct=await productModel.find({}).populate([

{
path:'likes',
select:'firstName email'
},
{
path:'comments',
populate:[
{
path:'comment_By',
select:'firstName email'
}

]
},
{
path:'Wishlists',
select:'firstName email'


}









])


    
res.status(200).json({message:"done",findProduct})



}






module.exports={addproduct,Updateproduct,Deleteproduct,Softdelete,likeAnddislike,addProductToWishList,Hidden,getAllUser}