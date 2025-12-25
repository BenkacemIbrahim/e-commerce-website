"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const analytics_controller_1 = require("../controllers/analytics.controller");
const router = (0, express_1.Router)();
router.get("/metrics", auth_1.requireAuth, (0, auth_1.requireRole)("admin"), analytics_controller_1.metrics);
exports.default = router;
