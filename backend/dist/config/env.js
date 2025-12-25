"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.env = {
    nodeEnv: process.env.NODE_ENV || "development",
    port: Number(process.env.PORT || 4000),
    mongoUri: process.env.MONGODB_URI || "",
    jwtSecret: process.env.JWT_SECRET || "",
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || "",
    corsOrigin: process.env.CORS_ORIGIN || "*",
    rateLimitWindowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 60000),
    rateLimitMax: Number(process.env.RATE_LIMIT_MAX || 100),
    uploadDir: process.env.UPLOAD_DIR || "uploads",
    adminDefaultEmail: process.env.ADMIN_DEFAULT_EMAIL || "",
    adminDefaultPassword: process.env.ADMIN_DEFAULT_PASSWORD || ""
};
