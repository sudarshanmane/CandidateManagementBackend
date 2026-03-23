"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = require("./auth/auth.routes");
let routes = (0, express_1.Router)();
routes.use("/api/v1", auth_routes_1.authRouter);
exports.default = routes;
