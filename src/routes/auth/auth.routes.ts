import { Router } from "express";
import { login } from "../../controllers/auth/auth.controllers";
import { validate } from "../../common/middlewares/validate.middleware";
import { loginSchema } from "../../validation/auth.validate";

export const authRouter = Router();
authRouter.post("/login", validate(loginSchema), login);
