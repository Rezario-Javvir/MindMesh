import { Router } from "express"
import { all_user } from "./user.controller.ts"

const router = Router()

// router.get('/search', find_user_name)
router.get('/all', all_user)

export default router