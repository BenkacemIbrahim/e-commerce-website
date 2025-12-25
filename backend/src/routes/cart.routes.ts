import { Router } from "express"
import { requireAuth } from "../middlewares/auth"
import { addItem, getCart, removeItem, updateItem } from "../controllers/cart.controller"

const router = Router()
router.get("/", requireAuth, getCart)
router.post("/", requireAuth, addItem)
router.patch("/:productId", requireAuth, updateItem)
router.delete("/:productId", requireAuth, removeItem)

export default router
