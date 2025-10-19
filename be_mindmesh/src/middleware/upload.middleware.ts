import multer, { type Multer } from "multer"
import { ErrorOutput } from "../util/Output.ts"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split('.').pop()
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const fileName = `blog-${uniqueSuffix}.${ext}`
        cb(null, fileName)
    }
})

const file_filter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
        cb(null, true)
    } else {
        cb(new ErrorOutput("Unsupported file type. Only JPEG, JPG, and PNG are allowed", 400))
    }
}

export const upload = multer({
    storage: storage,
    fileFilter: file_filter,
    limits: {
        fieldSize: 5 * 1024 * 1024
    }
})