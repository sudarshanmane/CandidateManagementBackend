import mongoose, { Schema } from "mongoose";
import "../org/org.model";

export enum UserRole {
  ADMIN = "ADMIN",
  INTERVIEWER = "INTERVIEWER",
  RECRUITER = "RECRUITER",
}

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  tenantId: mongoose.Types.ObjectId;
  isActive: boolean;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.RECRUITER,
    },
    tenantId: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

UserSchema.index({ tenantId: 1 });

export const User = mongoose.model<IUser>("User", UserSchema);
