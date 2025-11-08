import { Router } from "express"
import { create_comment_controller, get_command_by_id_article_controller } from "./comment_controller"
import { protect } from "../../middleware/auth.middleware"

const router = Router()

router.post("/article/:id", protect, create_comment_controller)
router.get("/article/:id", get_command_by_id_article_controller)

export default router