"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envConfig_1 = require("../../config/envConfig");
const errors_1 = require("../error/errors");
const generateToken = ({ userId, tenantId, role, orgDomain, }) => {
    return jsonwebtoken_1.default.sign({ userId, tenantId, role, orgDomain }, envConfig_1.JWT_SCERET, {
        expiresIn: "1d",
    });
};
exports.generateToken = generateToken;
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        throw new errors_1.AppError("Unauthorized", 401);
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, envConfig_1.JWT_SCERET);
        req.user = decoded;
        next();
    }
    catch (error) {
        throw new errors_1.AppError("Invalid token", 401);
    }
};
exports.authMiddleware = authMiddleware;
