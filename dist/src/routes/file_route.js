"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const multer_1 = __importDefault(require("multer"));
const express_1 = __importDefault(require("express"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
// const base = "http://212.116.187.226:3000"
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.jpg'); //Appending .jpg
    }
});
const upload = (0, multer_1.default)({ storage: storage });
router.post('/file', upload.single("file"), function (req, res) {
    console.log("inside file post");
    var file = JSON.parse(req.body.file);
    const base64ToArray = file.uri.split(";base64,");
    const extension = 'jpg';
    const imageData = base64ToArray[1];
    const fileName = (new Date().getTime() / 1000 | 0) + '.' + extension;
    const imagePath = path_1.default.join(__dirname, './../../../uploads/') + fileName;
    promises_1.default.writeFileSync(imagePath, imageData, { encoding: 'base64' });
    res.status(200).send({ url: imagePath });
});
module.exports = router;
//# sourceMappingURL=file_route.js.map