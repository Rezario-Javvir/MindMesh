import express from 'express'
import cors from "cors"
import path from 'path'
import { errorHandler } from './middleware/error.middleware'
import { notFound } from './middleware/notFound.middleware'
import { fileURLToPath } from 'url'
import authRoute from "./auth/auth.route"
import userRoute from "./modules/user/user_route"
import profileRoute from "./modules/profile/profile_route"
import resetRoute from "./dev/reset/reset_db.route"
import checkRoute from "./dev/check/check_db.route"
import articleRoute from "./modules/article/article_route"
import categoryRoute from "./modules/category/category_route"
import commentRoute from "./modules/comment/comment_route"

const app = express()

const corsOption = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const project_root = path.resolve(__dirname, "..")

app.use(express.json())
app.use(cors(corsOption))

app.get('/', (req, res) => {
    res.send('Hello, MindMesh!')
})

app.use("/upload/article", express.static(path.join(project_root, "public/images/article_image")))
app.use("/upload/avatar", express.static(path.join(project_root, "public/images/avatar_image")))

app.use("/auth", authRoute)
app.use("/user", userRoute)
app.use("/profile", profileRoute)
app.use("/dev-reset", resetRoute)
app.use("/dev-check", checkRoute)
app.use("/article", articleRoute)
app.use("/category", categoryRoute)
app.use("/comment", commentRoute)

app.use(notFound)
app.use(errorHandler)

export default app