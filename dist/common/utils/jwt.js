"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
const envConfig_1 = require("../../config/envConfig");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateAccessToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, envConfig_1.JWT_SCERET, { expiresIn: "15m" });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, envConfig_1.REFRESH_SECRET, { expiresIn: "1d" });
};
exports.generateRefreshToken = generateRefreshToken;
