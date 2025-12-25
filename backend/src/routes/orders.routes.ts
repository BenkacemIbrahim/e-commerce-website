import { Router } from "express"
import { requireAuth, requireRole } from "../middlewares/auth"
import { create, list, listMy, updateStatus } from "../controllers/orders.controller"

const router = Router()
router.get("/", requireAuth, requireRole("admin"), list)
router.get("/me", requireAuth, listMy)
router.post("/", requireAuth, create)
router.patch("/:id/status", requireAuth, requireRole("admin"), updateStatus)

export default router
