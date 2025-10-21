import { Router } from "express"
import { all_user_controller } from "./user_controller.ts"

const router = Router()

// router.get('/search', find_user_name)
router.get('/all', all_user_controller)

export default router