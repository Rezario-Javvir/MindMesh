import { Router } from "express"
import { reset_db } from "./reset_db.controller.ts"

const router = Router()

router.delete('/reset-db', reset_db)

export default router