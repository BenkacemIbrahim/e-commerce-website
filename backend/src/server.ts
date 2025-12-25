import express from "express"
import helmet from "helmet"
import cors from "cors"
import morgan from "morgan"
import rateLimit from "express-rate-limit"
import { env } from "./config/env"
import { connectDB } from "./config/db"
import { errorHandler } from "./middlewares/error"

import authRoutes from "./routes/auth.routes"
import productsRoutes from "./routes/products.routes"
import categoriesRoutes from "./routes/categories.routes"
import brandsRoutes from "./routes/brands.routes"
import ordersRoutes from "./routes/orders.routes"
import cartRoutes from "./routes/cart.routes"
import wishlistRoutes from "./routes/wishlist.routes"
import analyticsRoutes from "./routes/analytics.routes"
import settingsRoutes from "./routes/settings.routes"
import customersRoutes from "./routes/customers.routes"

const app = express()

app.use(helmet())
app.use(
  cors({
    origin: env.corsOrigin,
    credentials: true
  })
)
app.use(express.json({ limit: "1mb" }))
app.use(morgan(env.nodeEnv === "development" ? "dev" : "combined"))
app.use(
  rateLimit({
    windowMs: env.rateLimitWindowMs,
    max: env.rateLimitMax,
    standardHeaders: true,
    legacyHeaders: false
  })
)

app.get("/health", (req, res) => res.json({ status: "ok" }))

app.use("/api/auth", authRoutes)
app.use("/api/products", productsRoutes)
app.use("/api/categories", categoriesRoutes)
app.use("/api/brands", brandsRoutes)
app.use("/api/orders", ordersRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/wishlist", wishlistRoutes)
app.use("/api/analytics", analyticsRoutes)
app.use("/api/settings", settingsRoutes)
app.use("/api/admin/customers", customersRoutes)

app.use((req, res) => res.status(404).json({ message: "Not found" }))
app.use(errorHandler)

async function start() {
  await connectDB()
  app.listen(env.port, () => {
    // no logging comments per instructions
  })
}

start().catch((err) => {
  // process exit to indicate failure
  process.exit(1)
})
