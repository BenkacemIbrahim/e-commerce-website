import { Router } from "express"
import { requireAuth, requireRole } from "../middlewares/auth"
import { getSettings, updateSettings } from "../controllers/settings.controller"

const router = Router()
router.get("/", requireAuth, requireRole("admin"), getSettings)
router.put("/", requireAuth, requireRole("admin"), updateSettings)

export default router
