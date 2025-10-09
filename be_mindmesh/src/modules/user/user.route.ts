import { Router } from "express"
import { find_user_name } from "./user.controller.js"

const router = Router()

router.get('/search', find_user_name)

export default router