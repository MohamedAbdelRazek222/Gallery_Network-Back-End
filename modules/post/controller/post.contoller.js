const { commentModel } = require("../../../DB/model/comment.model")
const { postModel } = require("../../../DB/model/post.model")



const createPost=async(req, res)=>{

const {text}=req.body
if(req.fileErr){


res.status(400).json({message:"invalid format"})

}else{


const imageUrl=[]
req.files.forEach(file=>{

imageUrl.push(`${req.finalDestination}/${file.filename}`)


})
const newPost=new postModel({text,image:imageUrl,createdBy:req.user._id})
const savePost=await newPost.save()
res.status(200).json({message:"done",savePost})
}




}
// ---------------------------------------------------------------------------

// const displayAllPost=async(req, res)=>{

// const post=[]
// const cursor = postModel.find({}).cursor()
// for(let doc=await cursor.next();doc!=null;doc=await cursor.next()){

// console.log(doc);
// const comment=await commentModel.find({postId:doc._id})
// post.push({post:doc,comment})
// }

// res.status(200).json({message:"done",post})
// }
const displayAllPost=async(req, res)=>{

const post = await postModel.find({}).populate([

    {
     path:'createdBy',
    select:'userName email',
    },{

path:'comments',
populate:[

{
path:'createdBy',
select:'userName email'


},
{
path:'replay',
populate:[
{
path:'createdBy',
select:'userName email'


},{

path:'likes',
select:'userName email'

    
},{

path:'replay',
populate:[
    {
    path:'createdBy',
    select:'userName email'
    
    
    },{

        path:'likes',
        select:'userName email'
        
            
        }
    
    ]

}


]



},{
path:'likes'



}

]

    },{

        path:'likes',
       
        
            }
    
        ])
    

res.status(200).json({message:"done",post})
}





// const likePost=async(req, res)=>{

//     const post=await postModel.findOne({_id:req.params.id})
// if(!post){

//     res.status(400).json(({message:"invalid post id"}))
// }else{
// await postModel.findByIdAndUpdate(post._id,{$push:{likes:req.user._id}})

// res.status(200).json({message:"done"})
// }

// }
const likePost=async(req, res)=>{


await postModel.findByIdAndUpdate(req.params.id,{$push:{likes:req.user._id}})

res.status(200).json({message:"done"})


}

// ---------------------------------------------------
const unlikePost=async(req, res)=>{


await postModel.findByIdAndUpdate(req.params.id,{$pull:{likes:req.user._id}})

res.status(200).json({message:"done"})


}





module.exports = {createPost,displayAllPost,likePost,unlikePost}