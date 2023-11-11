const multer  = require("multer");

const storage = multer.diskStorage({
    destination : (req, file, cb) => cb(null, "uploads/avatars"),
    filename : (req, file, cb) => {
        const suffix = Date.now() + "-" + Math.round(Math.random() * 1E6);
        cb(null, file.fieldname + "-" + suffix + "." + file.originalname.split(".").pop())
    }
})

const imagesFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true)
    }
    else {
        cb(new Error("Недопустимый тип файла"))
    }
}


const upload = multer({storage, fileFilter : imagesFilter})

module.exports = {
    upload
}