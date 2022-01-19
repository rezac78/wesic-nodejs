const multer = require("multer");
const uuid = require("uuid").v4;

exports.storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${uuid()}_${file.originalname}`);
    },
});

exports.fileFilterMusic = (req, file, cb) => {
    if (file.mimetype == "audio/mpeg") {
        cb(null, true);
    } else {
        cb(" پشتیبانی میشو", false);
    }
};
