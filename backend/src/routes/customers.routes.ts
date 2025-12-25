import { Router } from "express"
import { requireAuth, requireRole } from "../middlewares/auth"
import { listCustomers } from "../controllers/customers.controller"

const router = Router()
router.get("/", requireAuth, requireRole("admin"), listCustomers)

export default router
