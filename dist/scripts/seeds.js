"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_model_1 = require("../modules/users/user.model");
const org_model_1 = require("../modules/org/org.model");
dotenv_1.default.config();
const seed = async () => {
    await mongoose_1.default.connect(process.env.MONGO_URI);
    await org_model_1.Organization.deleteMany({});
    await user_model_1.User.deleteMany({});
    const org = await org_model_1.Organization.create({
        name: "Star Technologies",
        domain: "star.tech",
        industry: "IT",
    });
    const password = await bcryptjs_1.default.hash("123456", 10);
    await user_model_1.User.create({
        name: "Admin User",
        email: "admin@star.tech",
        password,
        role: "ADMIN",
        tenantId: org._id,
    });
    console.log("✅ Seed completed");
    process.exit();
};
seed();
