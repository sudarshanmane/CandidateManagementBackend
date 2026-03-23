import { JWT_SCERET, REFRESH_SECRET } from "../../config/envConfig";
import jwt from "jsonwebtoken";

export const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, JWT_SCERET, { expiresIn: "15m" });
};

export const generateRefreshToken = (payload: object) => {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: "1d" });
};
