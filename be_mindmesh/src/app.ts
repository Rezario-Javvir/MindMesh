import express from 'express'
import cors from "cors"
import { errorHandler } from './middleware/error.middleware.ts'
import { notFound } from './middleware/notFound.middleware.ts'
import authRoute from "./auth/auth.route.ts"
import userRoute from "./modules/user/user.route.ts"
import profileRoute from "./modules/profile/profile.route.ts"
import resetRoute from "./dev/reset/reset_db.route.ts"
import checkRoute from "./dev/check/check_db.route.ts"
import blogRoute from "./modules/article/blog.route.ts"
import categoryRoute from "./modules/category/category.route.ts"

const app = express()

const corsOption = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}

app.use(express.json())
app.use(cors(corsOption))

app.get('/', (req, res) => {
    res.send('Hello, MindMesh!')
})

app.use("/auth", authRoute)
app.use("/user", userRoute)
app.use("/profile", profileRoute)
app.use("/dev-reset", resetRoute)
app.use("/dev-check", checkRoute)
app.use("/blog", blogRoute)
app.use("/category", categoryRoute)

app.use(notFound)
app.use(errorHandler)

export default app