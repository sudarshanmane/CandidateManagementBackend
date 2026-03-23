import { Router } from "express";
import { authMiddleware } from "../../common/middlewares/auth.middleware";
import { authorize } from "../../common/middlewares/rbac.middleware";
import { UserRole } from "../../modules/users/user.model";
import {
  createUser,
  deactivateUser,
  getMe,
  getUsers,
  updateUser,
} from "../../controllers/user/user.cotrollers";
import {
  createUserSchema,
  updateUserSchema,
} from "../../validation/user.validation";
import { validate } from "../../common/middlewares/validate.middleware";

const userRouter = Router();

userRouter.get("/me", authMiddleware, getMe);

userRouter.get("/", authMiddleware, authorize(UserRole.ADMIN), getUsers);

userRouter.post(
  "/",
  authMiddleware,
  authorize(UserRole.ADMIN),
  validate(createUserSchema),
  createUser,
);

userRouter.put(
  "/:userId",
  authMiddleware,
  validate(updateUserSchema),
  updateUser,
);

userRouter.put(
  "/userId",
  authMiddleware,
  authorize(UserRole.ADMIN),
  deactivateUser,
);

export default userRouter;
