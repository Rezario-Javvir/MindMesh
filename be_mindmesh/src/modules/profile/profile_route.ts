import { Router } from "express"
import {
    get_profile_id_controller, 
    edit_profile_controller,
    my_profile_repo
} from "./profile_controller.ts"
import { protect } from "../../middleware/auth.middleware.ts"

const router = Router()

router.get("/user/:id", get_profile_id_controller)
router.get("/my-profile", protect, my_profile_repo)
router.patch("/my-profile/edit", protect, edit_profile_controller)

export default router