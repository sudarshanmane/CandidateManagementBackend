import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/auth-request..types";
import { UserRole } from "../../modules/users/user.model";

export const authorize = (...allowedRoles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!allowedRoles.includes(req.user.role as UserRole)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};
