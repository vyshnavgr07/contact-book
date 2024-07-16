const express=require('express')
const userRouter=express.Router();
const userController=require('../controller/userController')
const tokenVerify =require('../middleware/verifyToken')
const imageUpload=require('../middleware/imageUpload')
userRouter.post('/register',userController.userRegistration)
.post('/login',userController.userLogin)
.post('/contact',tokenVerify,userController.createContact)
.get('/contact',userController.getContact)
.put('/contact',tokenVerify,userController.isSpam)
.get('/contact/filter',userController.filterData)
.get('/contact/page',userController.pagination)
.post('/contact/upload',imageUpload,userController.uploadFiles)












module.exports=userRouter;   