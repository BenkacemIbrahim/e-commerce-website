import { Router } from "express"
import { requireAuth, requireRole } from "../middlewares/auth"
import { addReview, create, getById, list, remove, update } from "../controllers/products.controller"

const router = Router()
router.get("/", list)
router.get("/:id", getById)
router.post("/", requireAuth, requireRole("admin"), create)
router.patch("/:id", requireAuth, requireRole("admin"), update)
router.delete("/:id", requireAuth, requireRole("admin"), remove)
router.post("/:id/reviews", requireAuth, addReview)

export default router
