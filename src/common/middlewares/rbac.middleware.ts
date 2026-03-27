import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/auth-request..types";
import { UserRole } from "../../modules/users/user.model";
import { AppError } from "../error/errors";

export const authorize = (...allowedRoles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError("Unauthorized", 401);
    }


    if (!allowedRoles.includes(req.user.role as UserRole)) {
      throw new AppError(
        "You don't have permissions to access this module!",
        403,
      );
    }


    next();
  };
};
