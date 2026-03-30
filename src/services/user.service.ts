import bcrypt from "bcryptjs";
import { Types } from "mongoose";
import { userRepository } from "../repos/UserRepository.repo";
import {
  CreateUserInput,
  UpdateUserInput,
} from "../validation/user.validation";
import { hashPassword } from "../common/utils/password";
import { AppError } from "../common/error/errors";
import { Users, UserProfile } from "../common/types/users";
import { User } from '../modules/users/user.model';

export const userService = {
  getMe: async (userId: string, tenantId: string): Promise<UserProfile> => {
    const user = await userRepository.findById(userId, tenantId);
    if (!user) {
      throw new AppError("User Not Found!", 400);
    }

    return user;
  },

  getUsers: async (tenantId: string, query?: any = {}): Promise<Users> => {
    return await userRepository.findByTenant(tenantId, query);
  },

  createUser: async (data: CreateUserInput, tenantId: string): Promise<User> => {
    const hashedPassword = await hashPassword(data.password);

    return await userRepository.createUser({
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
