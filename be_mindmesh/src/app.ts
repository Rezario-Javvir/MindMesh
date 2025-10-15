import express from 'express'
import { errorHandler } from './middleware/error.middleware.ts'
import { notFound } from './middleware/notFound.middleware.ts'
import authRoute from "./auth/auth.route.ts"
import userRoute from "./modules/user/user.route.ts"
import profileRoute from "./modules/profile/profile.route.ts"
import resetRoute from "./dev/reset_db.route.ts"

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello, MindMesh!')
})

app.use("/auth", authRoute)
app.use("/user", userRoute)
app.use("/profile", profileRoute)
app.use("/dev", resetRoute)

app.use(notFound)
app.use(errorHandler)

export default app