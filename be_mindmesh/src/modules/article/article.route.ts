import { Router } from "express"
import { create_article_controller, search_article_controller, get_all_article_controller, edit_article_controller } from "./article.controller.ts"

const router = Router()

router.post("/create", create_article_controller)
router.get("/all", get_all_article_controller)
router.get("/search", search_article_controller)
router.put("/edit/:id", edit_article_controller)

export default router