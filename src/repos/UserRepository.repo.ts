import { Types } from "mongoose";
import { BaseRepository } from "../common/repositories/base.repository";
import { IUser, User } from "../modules/users/user.model";
import { UserProfile, Users } from "../common/types/users";

class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(User);
  }

  async findByEmail(email: string) {
    return User.findOne({
      email,
    }).lean<IUser>();
  }

  async findByTenant(tenantId: string) {
    return User.find({
      tenantId: new Types.ObjectId(tenantId),
    })
      .select("name email role isActive createdAt")
      .lean<Users>();
  }

  async findById(userId: string, tenantId: string) {
    return User.findOne({
      _id: new Types.ObjectId(userId),
      tenantId: new Types.ObjectId(tenantId),
    })
      .select("name email role tenantId isActive createdAt updatedAt")
      .populate([{ path: "tenantId", select: "name domain industry" }])
      .lean<UserProfile | null>();
  }

  async createUser(data: Partial<IUser>) {
    return User.create(data);
  }
}

export const userRepository = new UserRepository();
