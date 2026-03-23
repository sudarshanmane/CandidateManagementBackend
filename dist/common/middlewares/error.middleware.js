"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const zod_1 = require("zod");
const errors_1 = require("../error/errors");
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
    return res.status(500).json({
        message: "Internal Server Error",
        success: false,
    });
};
exports.errorMiddleware = errorMiddleware;
