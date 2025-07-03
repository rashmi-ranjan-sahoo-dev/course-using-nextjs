import mongoose from "mongoose";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MONGO_URI: any = process.env.MONGO_URI;

console.log("🌐 MONGO_URI =", MONGO_URI); // Debug print

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
};
