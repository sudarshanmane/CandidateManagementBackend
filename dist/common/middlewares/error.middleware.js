"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const zod_1 = require("zod");
const errors_1 = require("../error/errors");
const mongoose_1 = __importDefault(require("mongoose"));
const errorMiddleware = (err, req, res, next) => {
    console.error(err); // 🔥 later → replace with
    if (err instanceof errors_1.AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }
    if (err instanceof zod_1.ZodError) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: err.format(),
        });
    }
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        const value = err.keyValue[field];
        return res.status(409).json({
            success: false,
            message: `${field} "${value}" already exists`,
        });
    }
    if (err instanceof mongoose_1.default.Error.ValidationError) {
        const messages = Object.values(err.errors).map((e) => e.message);
        return res.status(400).json({
            success: false,
            message: messages[0],
        });
    }
    if (err instanceof mongoose_1.default.Error.CastError) {
        return res.status(400).json({
            success: false,
            message: `Invalid ${err.path}: ${err.value}`,
        });
    }
    if (err instanceof mongoose_1.default.Error.DocumentNotFoundError) {
        return res.status(404).json({
            success: false,
            message: "Resource not found",
        });
    }
    if (err.name === "MongoNetworkError") {
        return res.status(503).json({
            success: false,
            message: "Database connection error",
        });
    }
    if (err.name === "MongoServerError") {
        return res.status(500).json({
            success: false,
            message: "Database error",
        });
    }
    return res.status(500).json({
        message: "Internal Server Error",
        success: false,
    });
};
exports.errorMiddleware = errorMiddleware;
