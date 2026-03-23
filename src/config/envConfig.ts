import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const MONG_URI = process.env.MONGO_URI as string;
export const JWT_SCERET = process.env.JWT_SCERET as string;
export const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

