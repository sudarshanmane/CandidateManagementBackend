import { Types } from "mongoose";
import { UserRole } from "../../modules/users/user.model";

export interface UserProfile {
    _id: Types.ObjectId;
    name: string;
    email: string;
    role: UserRole;
    tenantId: {
        _id: Types.ObjectId;
        name: string;
        domain: string;
        industry: string;
    };
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Users {
    _id: Types.ObjectId;
    name: string;
    email: string;
    role: UserRole;
    isActive: boolean;
    createdAt: Date;
}
