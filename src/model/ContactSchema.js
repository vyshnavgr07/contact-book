const mongoose=require('mongoose')
const contactSchema=mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    isSpam:{
        type:Boolean,
    },
    createdAt:{ 
        type: Date,
        default: Date.now
    }
})

const contact=mongoose.model('contact',contactSchema)


module.exports=contact;

 