import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((err) => err.message);

      return res.status(400).json({
        sucess: false,
        message: errors[0],
      });
    }

    req.body = result.data;
    next();
  };
