import { Router } from "express"
import { 
    create_article_controller, 
    search_article_controller, 
    get_all_article_controller,
    get_detail_article_controller,
    edit_article_controller 
} from "./article_controller.ts"
import { upload_article } from "../../middleware/upload_article.middleware.ts"
import { protect } from "../../middleware/auth.middleware.ts"

const router = Router()

router.post("/create", protect, upload_article.single("image"), create_article_controller)
router.get("/all", get_all_article_controller)
router.get("/search", search_article_controller)
router.get("/detail/:id", get_detail_article_controller)
router.patch("/edit/:id", protect, upload_article.single("image"), edit_article_controller)

export default router