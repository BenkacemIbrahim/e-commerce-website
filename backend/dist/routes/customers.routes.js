"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const customers_controller_1 = require("../controllers/customers.controller");
const router = (0, express_1.Router)();
router.get("/", auth_1.requireAuth, (0, auth_1.requireRole)("admin"), customers_controller_1.listCustomers);
exports.default = router;
