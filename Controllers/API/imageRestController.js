const multer = require('multer');
const path = require('path');
const imageService = require('../../Service/imageUploadService');
require('dotenv').config();

const IMAGE_PATH = process.env.IMAGE_PATH;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, IMAGE_PATH);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });


/** 
 * @param {*} req
 * @param {*} res
 */
async function processUpload(req, res){
    try{
        console.log(req,file);
        let image = {
            name: req.file.filename,
            usuario_carga: req.user.username
        }
        let result = await imageService.uploadedImageLog(image);
        if(result.getStatus()){
            res.status(200);
            res.json({
                "status" : "success"
            });
        }else{
            let jsonError = {
                "status" : "error",
                "message": result.getErr()
            };
            res.status(500);
            res.send(jsonError);
        }

    }catch(error){
        let jsonError = {
            "status" : "error",
            "message": error.message
        };
        console.log(error);
        res.status(500);
        res.send(jsonError);
    }
}

module.exports = {upload, processUpload}