import { User, UserRole } from "../../modules/users/user.model";
import jwt from "jsonwebtoken";
import { JWT_SCERET } from "../../config/envConfig";
import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/auth-request..types";
import { AppError } from "../error/errors";

type TokenPayload = {
  userId: string;
  tenantId: string;
  role: UserRole;
  orgDomain: string;
};

export const generateToken = ({
  userId,
  tenantId,
  role,
  orgDomain,
}: TokenPayload) => {
  return jwt.sign({ userId, tenantId, role, orgDomain }, JWT_SCERET, {
    expiresIn: "1d",
  });
};

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new AppError("Unauthorized", 401);
  }

  try {
    const decoded = jwt.verify(token, JWT_SCERET) as {
      userId: string;
      tenantId: string;
      role: UserRole;
      orgDomain: string;
    };

    let user = await User.findOne({ _id: decoded.userId, isActive: true });
    if (!user) {
      throw new AppError("Invalid Credentials!", 401);
    }

    req.user = decoded;

    next();
  } catch (error) {
    throw new AppError("Invalid token", 401);
  }
};
