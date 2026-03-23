"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const auth_middleware_1 = require("../common/middlewares/auth.middleware");
const password_1 = require("../common/utils/password");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = require("../modules/users/user.model");
const UserRepository_repo_1 = require("../repos/UserRepository.repo");
const errors_1 = require("../common/error/errors");
exports.AuthService = {
    register: async (data) => {
        const existingUser = await UserRepository_repo_1.userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new errors_1.AppError("User already exists", 400);
        }
        const hashedPassword = await (0, password_1.hashPassword)(data?.password);
        const user = await UserRepository_repo_1.userRepository.create({
            ...data,
            password: hashedPassword,
        });
        return user;
    },
    loginUser: async (email, password) => {
        const user = await user_model_1.User.findOne({ email, isActive: true }).lean();
        if (!user) {
            throw new errors_1.AppError("Invalid credentials!", 400);
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            throw new errors_1.AppError("Invalid credentials!", 400);
        }
        let token = (0, auth_middleware_1.generateToken)({
            userId: user?._id.toString(),
            tenantId: user.tenantId.toString(),
            role: user.role,
            orgDomain: user.email.split("@")[1],
        });
        return { token };
    },
};
