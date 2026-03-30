import { Router } from "express";
import { authRouter } from "./auth/auth.routes";
import userRouter from "./user/user.route";
import candidateRouter from "./candidates/candidates.routes";
import jobRouter from "./Jobs/jobs.routes";

let routes = Router();

routes.use("/api/v1/auth", authRouter);
routes.use("/api/v1/users", userRouter);
routes.use("/api/v1/candidates", candidateRouter);
routes.use("/api/v1/jobs", jobRouter);

export default routes;
