import multer from "multer"
import { ErrorOutput } from "../util/Output.ts"
import type { AuthRequest } from "./auth.middleware.ts"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/avatar_image')
    },
    filename: (req, file, cb) => {
        const auth_req = req as AuthRequest
        const user_id = auth_req.user?.id

        if (!user_id) {
            return cb(new ErrorOutput("Authentication required: User ID missing.", 401), '');
        }

        const ext = file.originalname.split('.').pop()
        const fileName = `avatar-${user_id}-${Date.now}.${ext}`
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

export const upload_avatar = multer({
    storage: storage,
    fileFilter: file_filter,
    limits: {
        fieldSize: 5 * 1024 * 1024
    }
})