"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const auth_service_1 = require("../../services/auth.service");
const response_1 = require("../../common/utils/response");
const asyncHandler_1 = require("../../common/utils/asyncHandler");
exports.login = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { email, password } = req.body;
    const token = await auth_service_1.AuthService.loginUser(email, password);
    (0, response_1.sendResponse)(res, {
        statusCode: 200,
        message: "success",
        data: { token },
    });
});
