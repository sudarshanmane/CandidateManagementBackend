import { z } from "zod";
import { UserRole } from "../modules/users/user.model";
import { AuthRequest } from "../common/types/auth-request..types";

export const createUserSchema = (req: AuthRequest) =>
  z.object({
    name: z.string().min(2),
    email: z
      .string()
      .email({ message: "Invalid email address!" })
      .refine(
        (email) => {
          console.log(req.user?.orgDomain)
          const orgDomain = req.user?.orgDomain;

          if (!orgDomain) {
            return false;
          }

          return email.toLowerCase().endsWith(`${orgDomain.toLowerCase()}`);
        },
        {
          message: `Email must belong to organizaion!`,
        },
      ),
    password: z.string().min(6),
    role: z.nativeEnum(UserRole),
  });

export const updateUserSchema = z.object({
  name: z.string().optional(),
  role: z.nativeEnum(UserRole).optional(),
  isActive: z.boolean().optional(),
});

export type CreateUserInput = z.infer<ReturnType<typeof createUserSchema>>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
