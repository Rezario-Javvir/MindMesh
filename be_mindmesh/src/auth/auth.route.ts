import { Router } from "express"
import { 
    controller_register, 
    controller_login,
    controller_forgot_password,
    controller_reset_password
} from "./auth.controller.ts"

const router = Router()

router.post("/register", controller_register)
router.post("/login", controller_login)
router.post("/forgot-password", controller_forgot_password)
router.post("/reset-password", controller_reset_password)

export default router