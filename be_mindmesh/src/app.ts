import express from 'express'
import cors from "cors"
import path from 'path'
import { errorHandler } from './middleware/error.middleware.ts'
import { notFound } from './middleware/notFound.middleware.ts'
import { fileURLToPath } from 'url'
import authRoute from "./auth/auth.route.ts"
import userRoute from "./modules/user/user_route.ts"
import profileRoute from "./modules/profile/profile_route.ts"
import resetRoute from "./dev/reset/reset_db.route.ts"
import checkRoute from "./dev/check/check_db.route.ts"
import articleRoute from "./modules/article/article_route.ts"
import categoryRoute from "./modules/category/category_route.ts"
import commentRoute from "./modules/comment/comment_route.ts"

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

app.use("/upload", express.static(path.join(project_root, "public/images")))

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