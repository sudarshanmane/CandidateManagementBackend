import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { User } from "../modules/users/user.model";
import { Organization } from "../modules/org/org.model";

dotenv.config();

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI as string);

  await Organization.deleteMany({});
  await User.deleteMany({});

  const org = await Organization.create({
    name: "Star Technologies",
    domain: "star.tech",
    industry: "IT",
  });

  const password = await bcrypt.hash("123456", 10);

  await User.create({
    name: "Admin User",
    email: "admin@star.tech",
    password,
    role: "ADMIN",
    tenantId: org._id,
  });

  console.log("✅ Seed completed");
  process.exit();
};

seed();
