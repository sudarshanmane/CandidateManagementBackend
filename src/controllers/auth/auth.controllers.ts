import { Request, Response } from "express";
import { AuthService } from "../../services/auth.service";
import { sendResponse } from "../../common/utils/response";
import { asyncHandler } from "../../common/utils/asyncHandler";

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const token = await AuthService.loginUser(email, password);

  sendResponse(res, {
    statusCode: 200,
    message: "success",
    data: token ,
  });
});
