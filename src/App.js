const express=require('express');
const app=express()
const userRouter=require('./router/userRoute')
const  cors= require('cors')
app.use(express.json())
app.use(cors())

app.use('/api/',userRouter)





module.exports=app

