"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signAccessToken = signAccessToken;
exports.signRefreshToken = signRefreshToken;
exports.verifyAccessToken = verifyAccessToken;
exports.verifyRefreshToken = verifyRefreshToken;
const jsonwebtoken_1 = require("jsonwebtoken");
const env_1 = require("../config/env");
function signAccessToken(payload, expiresIn = "15m") {
    const options = { expiresIn: expiresIn };
    return (0, jsonwebtoken_1.sign)(payload, env_1.env.jwtSecret, options);
}
function signRefreshToken(payload, expiresIn = "7d") {
    const options = { expiresIn: expiresIn };
    return (0, jsonwebtoken_1.sign)(payload, env_1.env.jwtRefreshSecret, options);
}
function verifyAccessToken(token) {
    return (0, jsonwebtoken_1.verify)(token, env_1.env.jwtSecret);
}
function verifyRefreshToken(token) {
    return (0, jsonwebtoken_1.verify)(token, env_1.env.jwtRefreshSecret);
}
