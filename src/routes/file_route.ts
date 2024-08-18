import multer from 'multer'
import express from "express";
const fs = require('fs');
const path = require('path');
const router = express.Router();

const base = "https://backend-69iy.onrender.com"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.jpg') //Appending .jpg
    }
})

const upload = multer({ storage: storage });
router.post('/file', upload.single("file"), function (req, res) {
    console.log("inside file post");
    var file = JSON.parse(req.body.file);

    const base64ToArray = file.uri.split(";base64,");
    const extension = 'jpg';
    
    const imageData = base64ToArray[1];
    const fileName = (new Date().getTime() / 1000|0) + '.' + extension;
    const imagePath = path.join(__dirname, './../../../uploads/') + fileName;
    fs.writeFileSync(imagePath, imageData,  { encoding: 'base64' });
    
    res.status(200).send({url: imagePath});
});

export = router