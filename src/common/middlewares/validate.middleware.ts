import { Request, Response, NextFunction } from "express";
export const validate =
  (schema: any) => (req: Request, res: Response, next: NextFunction) => {
    const finalSchema = typeof schema === "function" ? schema(req) : schema;
    const payload = req.body ?? {};

    const result = finalSchema.safeParse(payload);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error.issues[0].message,
      });
    }

    req.body = result.data;
    next();
  };
