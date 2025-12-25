import { Router } from "express"
import { requireAuth, requireRole } from "../middlewares/auth"
import { create, list, remove, update } from "../controllers/categories.controller"

const router = Router()
router.get("/", list)
router.post("/", requireAuth, requireRole("admin"), create)
router.patch("/:id", requireAuth, requireRole("admin"), update)
router.delete("/:id", requireAuth, requireRole("admin"), remove)

export default router
