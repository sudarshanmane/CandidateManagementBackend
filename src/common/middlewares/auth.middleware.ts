import { UserRole } from "../../modules/users/user.model";
import jwt from "jsonwebtoken";
import { JWT_SCERET } from "../../config/envConfig";
import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/auth-request..types";

type TokenPayload = {
  userId: string;
  tenantId: string;
  role: UserRole;
};

export const generateToken = ({ userId, tenantId, role }: TokenPayload) => {
  return jwt.sign({ userId, tenantId, role }, JWT_SCERET, { expiresIn: "1d" });
};

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SCERET) as {
      userId: string;
      tenantId: string;
      role: string;
    };

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
