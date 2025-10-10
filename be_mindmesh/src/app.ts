import express from 'express'
import { errorHandler } from './middleware/error.middleware.ts'
import { notFound } from './middleware/notFound.middleware.ts'
import authRoute from "./modules/user/auth/auth.route.ts"
import userRouter from "./modules/user/user.route.ts"

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