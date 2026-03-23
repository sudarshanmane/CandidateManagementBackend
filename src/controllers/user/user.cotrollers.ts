import { NextFunction, Response } from "express";
import { AuthRequest } from "../../common/types/auth-request..types";
import { userService } from "../../services/user.service";
import { asyncHandler } from "../../common/utils/asyncHandler";
import { sendResponse } from "../../common/utils/response";

export const getMe = asyncHandler(async (req: AuthRequest, res: Response) => {
  const user = await userService.getMe(req?.user!.userId, req?.user!.tenantId);

  sendResponse(res, {
    message: "User fetched successfully",
    data: user,
  });
});

export const getUsers = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const data = await userService.getUsers(req.user!.tenantId);

    sendResponse(res, {
      message: "Users fetched successfully",
      data: data,
    });
  },
);

export const createUser = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const data = await userService.createUser(req.body, req.user!.tenantId);

    sendResponse(res, {
      message: "User crated successfully",
      data: data,
    });
  },
);

export const updateUser = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const data = await userService.updateUser(
      req.user!.userId,
      req.user!.tenantId,
      req.body,
    );

    sendResponse(res, {
      message: "User Updated successfully",
      data: data,
    });
  },
);

export const deactivateUser = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const data = await userService.deactivateUser(
      req.user!.userId,
      req.user!.tenantId,
    );

    sendResponse(res, {
      message: "User Deactivated successfully",
      data: data,
    });
  },
);
