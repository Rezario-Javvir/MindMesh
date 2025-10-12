import { Router } from "express"
import { get_profile_id, edit_profile } from "./profile.controller.ts"

const router = Router()

router.get("/:id", get_profile_id)
router.put("/edit/:id", edit_profile)

export default router