"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tenantMiddleware = void 0;
const tenantMiddleware = (req, res, next) => {
    if (!req.user?.tenantId) {
        return res.status(403).json({ message: "Tenant not found" });
    }
    req.tenantId = req.user.tenantId;
    next();
};
exports.tenantMiddleware = tenantMiddleware;
