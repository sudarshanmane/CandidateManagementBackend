"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
const user_model_1 = require("../modules/users/user.model");
exports.createUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(2),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    role: zod_1.z.nativeEnum(user_model_1.UserRole),
});
exports.updateUserSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    role: zod_1.z.nativeEnum(user_model_1.UserRole).optional(),
    isActive: zod_1.z.boolean().optional(),
});
