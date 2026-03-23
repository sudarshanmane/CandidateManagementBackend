import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "../error/errors";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err); // 🔥 later → replace with

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.format(),
    });
  }

  return res.status(500).json({
    message: "Internal Server Error",
    success: false,
  });
};
