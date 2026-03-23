import mongoose from "mongoose";
import { MONG_URI } from "./envConfig";

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONG_URI);
    console.log("-------- MongoDB Connected --------");
  } catch (error) {
    console.error("--------X MongoDB Connection Failed --------");
    process.exit(1);
  }
};
