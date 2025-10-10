import { Router } from "express"
import { find_user_name, all_user } from "./user.controller.ts"

const router = Router()

router.get('/search', find_user_name)
router.get('/all', all_user)

export default router