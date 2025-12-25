"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const env_1 = require("./config/env");
const db_1 = require("./config/db");
const error_1 = require("./middlewares/error");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const products_routes_1 = __importDefault(require("./routes/products.routes"));
const categories_routes_1 = __importDefault(require("./routes/categories.routes"));
const brands_routes_1 = __importDefault(require("./routes/brands.routes"));
const orders_routes_1 = __importDefault(require("./routes/orders.routes"));
const cart_routes_1 = __importDefault(require("./routes/cart.routes"));
const wishlist_routes_1 = __importDefault(require("./routes/wishlist.routes"));
const analytics_routes_1 = __importDefault(require("./routes/analytics.routes"));
const settings_routes_1 = __importDefault(require("./routes/settings.routes"));
const customers_routes_1 = __importDefault(require("./routes/customers.routes"));
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: env_1.env.corsOrigin,
    credentials: true
}));
app.use(express_1.default.json({ limit: "1mb" }));
app.use((0, morgan_1.default)(env_1.env.nodeEnv === "development" ? "dev" : "combined"));
app.use((0, express_rate_limit_1.default)({
    windowMs: env_1.env.rateLimitWindowMs,
    max: env_1.env.rateLimitMax,
    standardHeaders: true,
    legacyHeaders: false
}));
app.get("/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/auth", auth_routes_1.default);
app.use("/api/products", products_routes_1.default);
app.use("/api/categories", categories_routes_1.default);
app.use("/api/brands", brands_routes_1.default);
app.use("/api/orders", orders_routes_1.default);
app.use("/api/cart", cart_routes_1.default);
app.use("/api/wishlist", wishlist_routes_1.default);
app.use("/api/analytics", analytics_routes_1.default);
app.use("/api/settings", settings_routes_1.default);
app.use("/api/admin/customers", customers_routes_1.default);
app.use((req, res) => res.status(404).json({ message: "Not found" }));
app.use(error_1.errorHandler);
async function start() {
    await (0, db_1.connectDB)();
    app.listen(env_1.env.port, () => {
        // no logging comments per instructions
    });
}
start().catch((err) => {
    // process exit to indicate failure
    process.exit(1);
});
