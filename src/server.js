const app=require('./App');
const http=require('http');
const env=require('dotenv')
env.config({path:'./.env'})
const port =process.env.PORT;
const db=process.env.DB_URL;
const server=http.createServer(app);
const mongoose=require("mongoose");


mongoose.connect(db)
.then((data)=>console.log('Db connected'))
.catch((err)=>console.log(err))


server.listen(port,()=>{
    console.log(`server is listening on PORT:${port}`);
})


