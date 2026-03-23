import { Router } from "express";
import { authRouter } from "./auth/auth.routes";
import { authMiddleware } from "../common/middlewares/auth.middleware";

let routes = Router();

routes.use("/api/v1", authRouter);

export default routes;
