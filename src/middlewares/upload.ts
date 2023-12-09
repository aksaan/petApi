import { Request } from 'express';
import multer, { diskStorage } from 'multer';

interface ICallBackString {
    (error: Error | null, destination: string) : void
}

interface ICallBackBoolean {
    (error: Error | null, destination?: string | boolean) : void
}

const storage = diskStorage({
    destination : (req : Request, file : Express.Multer.File, cb : ICallBackString) => cb(null, "uploads/avatars"),
    filename : (req : Request, file : Express.Multer.File, cb : ICallBackString) => {
        const suffix = Date.now() + "-" + Math.round(Math.random() * 1E6);
        cb(null, file.fieldname + "-" + suffix + "." + file.originalname.split(".").pop())
    }
})

const imagesFilter = (req : Request, file : Express.Multer.File, cb : ICallBackBoolean) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true)
    }
    else {
        cb(new Error("Недопустимый тип файла"))
    }
}


export const upload = multer({storage, fileFilter : imagesFilter})