"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const settings_controller_1 = require("../controllers/settings.controller");
const router = (0, express_1.Router)();
router.get("/", auth_1.requireAuth, (0, auth_1.requireRole)("admin"), settings_controller_1.getSettings);
router.put("/", auth_1.requireAuth, (0, auth_1.requireRole)("admin"), settings_controller_1.updateSettings);
exports.default = router;
