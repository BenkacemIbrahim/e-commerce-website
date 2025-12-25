import { Router } from "express"
import { requireAuth } from "../middlewares/auth"
import { addToWishlist, getWishlist, removeFromWishlist } from "../controllers/wishlist.controller"

const router = Router()
router.get("/", requireAuth, getWishlist)
router.post("/", requireAuth, addToWishlist)
router.delete("/:productId", requireAuth, removeFromWishlist)

export default router
