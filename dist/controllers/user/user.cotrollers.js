"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivateUser = exports.updateUser = exports.createUser = exports.getUsers = exports.getMe = void 0;
const user_service_1 = require("../../services/user.service");
const asyncHandler_1 = require("../../common/utils/asyncHandler");
const response_1 = require("../../common/utils/response");
exports.getMe = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const user = await user_service_1.userService.getMe(req?.user.userId, req?.user.tenantId);
    (0, response_1.sendResponse)(res, {
        message: "User fetched successfully",
        data: user,
    });
});
exports.getUsers = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const data = await user_service_1.userService.getUsers(req.user.tenantId);
    (0, response_1.sendResponse)(res, {
        message: "Users fetched successfully",
        data: data,
    });
});
exports.createUser = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const data = await user_service_1.userService.createUser(req.body, req.user.tenantId);
    (0, response_1.sendResponse)(res, {
        message: "User crated successfully",
        data: data,
    });
});
exports.updateUser = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const data = await user_service_1.userService.updateUser(req.user.userId, req.user.tenantId, req.body);
    (0, response_1.sendResponse)(res, {
        message: "User Updated successfully",
        data: data,
    });
});
exports.deactivateUser = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const data = await user_service_1.userService.deactivateUser(req.user.userId, req.user.tenantId);
    (0, response_1.sendResponse)(res, {
        message: "User Deactivated successfully",
        data: data,
    });
});
