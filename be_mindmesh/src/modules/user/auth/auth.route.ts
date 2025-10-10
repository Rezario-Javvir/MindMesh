import { Router } from "express"
import { controller_register, controller_login } from "./auth.controller.ts"

const router = Router()

router.post("/register", controller_register)
router.post("/login", controller_login)

export default router