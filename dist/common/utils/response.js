"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, options) => {
    const { statusCode = 200, message, data } = options;
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};
exports.sendResponse = sendResponse;
