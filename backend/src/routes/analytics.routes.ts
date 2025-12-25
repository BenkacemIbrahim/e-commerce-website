import { Router } from "express"
import { requireAuth, requireRole } from "../middlewares/auth"
import { metrics } from "../controllers/analytics.controller"

const router = Router()
router.get("/metrics", requireAuth, requireRole("admin"), metrics)

export default router
