import { Router } from "express"
import { all_user_controller } from "./user_controller.ts"
import { protect } from "../../middleware/auth.middleware.ts"

const router = Router()

// router.get('/search', find_user_name)
router.get('/my-account', protect, all_user_controller)

export default router