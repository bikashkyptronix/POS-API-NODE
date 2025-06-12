import { envs, StatusError } from "../config/index.js";
import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(envs.mongodb_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
};
