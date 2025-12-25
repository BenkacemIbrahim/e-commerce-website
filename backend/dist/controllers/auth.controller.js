"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
exports.refresh = refresh;
exports.logout = logout;
const zod_1 = require("zod");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = require("../models/User");
const RefreshToken_1 = require("../models/RefreshToken");
const jwt_1 = require("../utils/jwt");
const registerSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1),
    lastName: zod_1.z.string().min(1),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8)
});
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8)
});
async function register(req, res) {
    const { firstName, lastName, email, password } = registerSchema.parse(req.body);
    const existing = await User_1.User.findOne({ email });
    if (existing)
        return res.status(409).json({ message: "Email already in use" });
    const passwordHash = await bcryptjs_1.default.hash(password, 10);
    const user = await User_1.User.create({ email, passwordHash, firstName, lastName, role: "user" });
    const accessToken = (0, jwt_1.signAccessToken)({ id: user.id, email: user.email, role: user.role });
    const refreshToken = (0, jwt_1.signRefreshToken)({ id: user.id, email: user.email, role: user.role });
    const decoded = (0, jwt_1.verifyRefreshToken)(refreshToken);
    await RefreshToken_1.RefreshToken.create({ user: user._id, token: refreshToken, expiresAt: new Date(decoded.exp * 1000) });
    res.status(201).json({ user: { id: user.id, email: user.email, firstName, lastName, role: user.role }, accessToken, refreshToken });
}
async function login(req, res) {
    const { email, password } = loginSchema.parse(req.body);
    const user = await User_1.User.findOne({ email });
    if (!user)
        return res.status(401).json({ message: "Invalid credentials" });
    const ok = await bcryptjs_1.default.compare(password, user.passwordHash);
    if (!ok)
        return res.status(401).json({ message: "Invalid credentials" });
    const accessToken = (0, jwt_1.signAccessToken)({ id: user.id, email: user.email, role: user.role });
    const refreshToken = (0, jwt_1.signRefreshToken)({ id: user.id, email: user.email, role: user.role });
    const decoded = (0, jwt_1.verifyRefreshToken)(refreshToken);
    await RefreshToken_1.RefreshToken.findOneAndUpdate({ user: user._id }, { token: refreshToken, expiresAt: new Date(decoded.exp * 1000) }, { upsert: true });
    res.json({ user: { id: user.id, email: user.email, role: user.role }, accessToken, refreshToken });
}
async function refresh(req, res) {
    const token = req.body.refreshToken;
    if (!token)
        return res.status(400).json({ message: "Missing refresh token" });
    const stored = await RefreshToken_1.RefreshToken.findOne({ token });
    if (!stored)
        return res.status(401).json({ message: "Invalid refresh token" });
    try {
        const decoded = (0, jwt_1.verifyRefreshToken)(token);
        const accessToken = (0, jwt_1.signAccessToken)({ id: decoded.id, email: decoded.email, role: decoded.role });
        res.json({ accessToken });
    }
    catch {
        res.status(401).json({ message: "Invalid refresh token" });
    }
}
async function logout(req, res) {
    const token = req.body.refreshToken;
    if (token)
        await RefreshToken_1.RefreshToken.deleteOne({ token });
    res.json({ success: true });
}
