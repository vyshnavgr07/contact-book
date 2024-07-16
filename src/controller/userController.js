const User=require('../model/UserSchema');
const Contact=require('../model/ContactSchema')
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')

const multer=require('multer')
const env=require('dotenv')
env.config({path:'./.env'})

const mongoose=require('mongoose')
const secret=process.env.SECRET;
const userRegistration=async (req,res)=>{
  
try {
    const {name,email,password}=req.body;
    const ExistUser= await User.findOne({email:email})
    if(ExistUser){
        return res.status(400).json({
            status:'failed',
            message:'user already exist'
        })
    }
    const salt = bcrypt.genSaltSync(10);
   const hash = bcrypt.hashSync(password, salt);
 const datas={
        name:name,
        email:email,
        password:hash,

    }
    const user=new User(datas)
    await user.save() 

res.status(201).json({
        status:'success',
        user
    })
} catch (error) {
    console.log(error);
    res.status(500).json({
        status:'failed',
        message:'internal server error'
    })
}
}




const userLogin=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const finduser=await User.findOne({email:email})
        let userPassword=await finduser.password;
     const isValid=bcrypt.compareSync(password,userPassword); 
 if(isValid){
       const token=jwt.sign({user:finduser},secret,{expiresIn:'5h'})
       return res.status(200).json({
        status:'success',
        message:'succesfully loged in',
        token,
        user:finduser    
})   
        } else{
            res.status(500).json({
                status:'failed',
                message:'username or password incorrect'
            })
        }
          
    } catch (error) {
        console.log(error);
    }
}






const createContact=async(req,res)=>{
try {
   const decoded= req.decoded
   let userId=decoded.user._id
  const data=req.body;

  if(!data){
    return res.status(500).json({
    status:'failed',
    message:'no data provided'
    })
  }
   
 const contact=new Contact({userId:userId,isSpam:false,...data});
 await contact.save()

 res.status(200).json({
    status:'success',
    message:'succesfully created contact'
 })
} catch (error) {
    console.log(error,"err");
}
}

    
const getContact=async(req,res)=>{
  try {
    const contact=await Contact.find().populate('userId');
   

    if(contact){  
        return res.status(200).json({
            status:'success',
            message:'succesfully fetched data',
            contact
        })
    }

  } catch (error) {
    return res.status(500).json({
        status:'failed',
        message:'internal server error'
    })
  }
}

const isSpam=async(req,res)=>{
try {
    const {isSpam,ids}=req.body;
    const val=!isSpam
    let id =new mongoose.Types.ObjectId(ids);
    const spam = await Contact.findOneAndUpdate(
        { _id: id },
        { isSpam:val},
        { new: true }
      );  

      return res.status(200).json({
        status:'success',
        message:'susscesfull completed',
        spam
      })
} catch (error) {
     res.status(500).json({
        status:'failed',
        message:'internal server error'
    })

    console.log(error,"err");
}
}


const filterData=async(req,res)=>{
try {
     const data=await Contact.find().populate('userId')
  let filteredData=await data.filter((x)=>x.isSpam===false)
     if(filteredData.length===0){
        return res.status(400).json({
            status:'failed',
            message:'no data '
        }) 
     }
    
     res.status(200).json({
        status:'success',
        message:'succesfully fetched data',
        filteredData
     })
} catch (error) {
    res.status(500).json({
        status:'failed',
        message:'internal server error'
    })
    console.log(error,"err");
}
}

const pagination=async(req,res)=>{
try {
    let page=req.query.page;
    let limit=2;
    let startindex=(page-1)*limit;
    let endindex=page*limit;
    let data=await Contact.find().limit(limit).skip(startindex).exec();
    // let pData=data.slice(startindex,endindex)

    return res.status(200).json({
        message:'success',
        data
    })
} catch (error) {
    console.log(error);
}
}



const uploadFiles=async(req,res)=>{
    try {
     const {link}=req.link;
     console.log(link,"lin")
    } catch (error) {
        console.log(error,"err");
    }
}

  


module.exports={userRegistration,userLogin,createContact,getContact,isSpam,filterData,pagination,uploadFiles}   