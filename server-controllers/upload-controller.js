
module.exports =(app) => {

    const multer = require("multer");
    let prodMode = process.env.NODE_ENV === 'production';
    const storage= multer.diskStorage({
        destination:(req, file, cb)=>{
            cb(null,__dirname+ `/../${prodMode ? "build" : "dist"}/uploads/`) ;
        },
        filename:(req, file, cb)=>{
            // cb(null,file.originalname) ;
            // console.log(file)
            let tail = file.originalname.split(".")[1];
            console.log(tail)
            let ran = Math.ceil(Math.random() *1000 +1) ;
            cb(null,  ran +file.originalname) ;
        }
    })

    const upload= multer({storage : storage})
    app.post("/file/upload" , upload.single('imageFile') , (req,res) =>{
        // console.log(req.file)
        if(req.file){
            // setTimeout(()=>{
            res.send({filePath: "/uploads/"+req.file.filename})
            // },5000)
        }
    })
}