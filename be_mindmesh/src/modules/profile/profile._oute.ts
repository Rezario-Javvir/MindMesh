import { Router } from "express"
import { get_profile_id_controller, edit_profile_controller } from "./profile_controller.ts"

const router = Router()

router.get("/:id", get_profile_id_controller)
router.put("/edit/:id", edit_profile_controller)

export default router