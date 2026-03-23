import { Request, Response } from "express";
import { AuthService } from "../../services/auth.service";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const token = await AuthService.loginUser(email, password);
    res.json(token);
  } catch (error: any) {
    res.status(400).json({ message: error?.message });
  }
};
