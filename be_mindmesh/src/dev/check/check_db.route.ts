import { Router } from "express"
import { check_user, check_profile, check_article, check_category, check_comment } from "./check_db.controller.ts"

const router = Router()

router.get("/user", check_user)
router.get("/profile", check_profile)
router.get("/blog", check_article)
router.get("/category", check_category)
router.get("/comment", check_comment)

export default router