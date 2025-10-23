import { Router } from "express"
import { get_profile_id_controller, edit_profile_controller } from "./profile_controller.ts"
import { protect } from "../../middleware/auth.middleware.ts"

const router = Router()

router.get("/user/:id", get_profile_id_controller)
router.patch("/user/edit", protect, edit_profile_controller)

export default router