"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const errors_1 = require("../error/errors");
const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            throw new errors_1.AppError("Unauthorized", 401);
        }
        if (!allowedRoles.includes(req.user.role)) {
            throw new errors_1.AppError("You don't have permissions to access this module!", 403);
        }
        next();
    };
};
exports.authorize = authorize;
