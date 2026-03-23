"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_controllers_1 = require("../../controllers/auth/auth.controllers");
const validate_middleware_1 = require("../../common/middlewares/validate.middleware");
const auth_validate_1 = require("../../validation/auth.validate");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post("/login", (0, validate_middleware_1.validate)(auth_validate_1.loginSchema), auth_controllers_1.login);
