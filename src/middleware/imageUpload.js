const multer=require('multer');
const path=require('path')



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(__dirname,'imagess'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })


  const imageUploads=async(req,res,next)=>{
    try {
        upload.single('image')(req,res,(err)=>{
            if(err){
                console.log(err);
                return res.status(400).json({ 
                    status:'failed multer erro'
                })
            }
            return res.status(200).json({
                status:'success',
                file:req.file.filename
            })
        
        })
    } catch (error) {
        console.log(error);
    }
  }

module.exports=imageUploads;
