import { Router } from "express";
import { authRouter } from "./auth/auth.routes";
import userRouter from "./user/user.route";

let routes = Router();

routes.use("/api/v1/auth", authRouter);
routes.use("/api/v1/users", userRouter);



export default routes;
