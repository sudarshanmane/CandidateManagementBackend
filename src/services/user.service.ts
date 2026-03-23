import bcrypt from "bcryptjs";
import { Types } from "mongoose";
import { userRepository } from "../repos/UserRepository.repo";
import {
  CreateUserInput,
  UpdateUserInput,
} from "../validation/user.validation";
import { hashPassword } from "../common/utils/password";
import { AppError } from "../common/error/errors";

export const userService = {
  getMe: async (userId: string, tenantId: string) => {
    const user = userRepository.findById(userId, tenantId);
    if (!user) {
      throw new AppError("User Not Found!", 400);
    }

    return user;
  },

  getUsers: async (tenantId: string) => {
    return userRepository.findByTenant(tenantId);
  },

  createUser: async (data: CreateUserInput, tenantId: string) => {
    const hashedPassword = await hashPassword(data.password);

    return userRepository.createUser({
      ...data,
      password: hashedPassword,
      tenantId: new Types.ObjectId(tenantId),
    });
  },

  updateUser: async (
    userId: string,
    tenantId: string,
    data: UpdateUserInput,
  ) => {
    return userRepository.update(
      {
        _id: new Types.ObjectId(userId),
        tenantId: new Types.ObjectId(tenantId),
      },
      data,
    );
  },

  deactivateUser: async (userId: string, tenantId: string) => {
    return userRepository.update(
      {
        _id: new Types.ObjectId(userId),
        tenantId: new Types.ObjectId(tenantId),
      },
      { isActive: false },
    );
  },
};
