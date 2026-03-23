import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "../error/errors";
import mongoose from "mongoose";

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

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];

    return res.status(409).json({
      success: false,
      message: `${field} "${value}" already exists`,
    });
  }

  if (err instanceof mongoose.Error.ValidationError) {
    const messages = Object.values(err.errors).map((e: any) => e.message);

    return res.status(400).json({
      success: false,
      message: messages[0],
    });
  }

  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      success: false,
      message: `Invalid ${err.path}: ${err.value}`,
    });
  }

  if (err instanceof mongoose.Error.DocumentNotFoundError) {
    return res.status(404).json({
      success: false,
      message: "Resource not found",
    });
  }

  if (err.name === "MongoNetworkError") {
    return res.status(503).json({
      success: false,
      message: "Database connection error",
    });
  }

  if (err.name === "MongoServerError") {
    return res.status(500).json({
      success: false,
      message: "Database error",
    });
  }

  return res.status(500).json({
    message: "Internal Server Error",
    success: false,
  });
};
