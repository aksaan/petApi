const multer  = require("multer");

const storage = multer.diskStorage({
    destination : (req, file, cb) => cb(null, "uploads/"),
    filename : (req, file, cb) => {
        const suffix = Date.now() + "-" + Math.round(Math.random() * 1E6);
        cb(null, file.fieldname + "-" + suffix + "." + file.originalname.split(".").pop())
    }
})


const upload = multer({storage})

module.exports = {
    upload
}