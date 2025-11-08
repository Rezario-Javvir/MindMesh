import { Router } from "express"
import { add_category_controller, get_categories_controller } from "./category_controller"

const router = Router()

router.post("/add", add_category_controller)
router.get("/all", get_categories_controller)

export default router