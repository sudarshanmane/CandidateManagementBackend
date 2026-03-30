"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = require("./auth/auth.routes");
const user_route_1 = __importDefault(require("./user/user.route"));
const candidates_routes_1 = __importDefault(require("./candidates/candidates.routes"));
let routes = (0, express_1.Router)();
routes.use("/api/v1/auth", auth_routes_1.authRouter);
routes.use("/api/v1/users", user_route_1.default);
routes.use("/api/v1/candidates", candidates_routes_1.default);
exports.default = routes;
