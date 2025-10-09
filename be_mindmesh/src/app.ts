import express from 'express'
import { errorHandler } from './middleware/error.middleware.js'
import { notFound } from './middleware/notFound.middleware.js'
import authRoute from "./modules/user/auth/auth.route.js"
import userRouter from "./modules/user/user.route.js"

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello, MindMesh!')
})

app.use("/auth", authRoute)
app.use("/user", userRouter)

app.use(notFound)
app.use(errorHandler)

export default app