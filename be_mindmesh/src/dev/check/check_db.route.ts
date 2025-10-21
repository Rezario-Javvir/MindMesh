import { Router } from "express"
import { 
    check_user_controller, 
    check_profile_controller, 
    check_blog_controller, 
    check_category_controller, 
    check_comment_controller 
} from "./check_db.controller.ts"

const router = Router()

router.get("/user", check_user_controller)
router.get("/profile", check_profile_controller)
router.get("/blog", check_blog_controller)
router.get("/category", check_category_controller)
router.get("/comment", check_comment_controller)

export default router