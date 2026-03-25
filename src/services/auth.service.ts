import { generateToken } from "../common/middlewares/auth.middleware";
import { hashPassword } from "../common/utils/password";
import bcrypt from "bcryptjs";
import { IUser, User, UserRole } from "../modules/users/user.model";
import { userRepository } from "../repos/UserRepository.repo";
import { AppError } from "../common/error/errors";

interface User {
  userId: string;
  tenantId: string;
  role: UserRole;
  orgDomain: string;
}

export const AuthService = {
  register: async (data: any) => {
    const existingUser = await userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new AppError("User already exists", 400);
    }

    const hashedPassword = await hashPassword(data?.password);
    const user = await userRepository.create({
      ...data,
      password: hashedPassword,
    });

    return user;
  },

  loginUser: async (
    email: string,
    password: string,
  ): Promise<{ token: string; user: User }> => {
    const user = await User.findOne({ email, isActive: true }).lean<IUser>();

    if (!user) {
      throw new AppError("Invalid credentials!", 400);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new AppError("Invalid credentials!", 400);
    }

    let orgDomain = user.email.split("@")[1];
    const payload = {
      userId: user?._id.toString(),
      tenantId: user.tenantId.toString(),
      role: user.role,
      orgDomain: `@${orgDomain}`,
    };

    let token = generateToken(payload);

    return { token, user: payload };
  },
};
