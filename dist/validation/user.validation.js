"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
const user_model_1 = require("../modules/users/user.model");
const createUserSchema = (req) => zod_1.z.object({
    name: zod_1.z.string().min(2),
    email: zod_1.z
        .string()
        .email({ message: "Invalid email address!" })
        .refine((email) => {
        console.log(req.user?.orgDomain);
        const orgDomain = req.user?.orgDomain;
        if (!orgDomain) {
            return false;
        }
        return email.toLowerCase().endsWith(`${orgDomain.toLowerCase()}`);
    }, {
        message: `Email must belong to organizaion!`,
    }),
    password: zod_1.z.string().min(6),
    role: zod_1.z.nativeEnum(user_model_1.UserRole),
});
exports.createUserSchema = createUserSchema;
exports.updateUserSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    role: zod_1.z.nativeEnum(user_model_1.UserRole).optional(),
    isActive: zod_1.z.boolean().optional(),
});
