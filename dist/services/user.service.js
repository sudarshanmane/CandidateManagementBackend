"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const mongoose_1 = require("mongoose");
const UserRepository_repo_1 = require("../repos/UserRepository.repo");
const password_1 = require("../common/utils/password");
const errors_1 = require("../common/error/errors");
exports.userService = {
    getMe: async (userId, tenantId) => {
        const user = UserRepository_repo_1.userRepository.findById(userId, tenantId);
        if (!user) {
            throw new errors_1.AppError("User Not Found!", 400);
        }
        return user;
    },
    getUsers: async (tenantId) => {
        return UserRepository_repo_1.userRepository.findByTenant(tenantId);
    },
    createUser: async (data, tenantId) => {
        const hashedPassword = await (0, password_1.hashPassword)(data.password);
        return UserRepository_repo_1.userRepository.createUser({
            ...data,
            password: hashedPassword,
            tenantId: new mongoose_1.Types.ObjectId(tenantId),
        });
    },
    updateUser: async (userId, tenantId, data) => {
        return UserRepository_repo_1.userRepository.update({
            _id: new mongoose_1.Types.ObjectId(userId),
            tenantId: new mongoose_1.Types.ObjectId(tenantId),
        }, data);
    },
    deactivateUser: async (userId, tenantId) => {
        return UserRepository_repo_1.userRepository.update({
            _id: new mongoose_1.Types.ObjectId(userId),
            tenantId: new mongoose_1.Types.ObjectId(tenantId),
        }, { isActive: false });
    },
};
