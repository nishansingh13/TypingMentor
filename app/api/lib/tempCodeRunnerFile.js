import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();
const MONGO_URI = process.env.MONGO_URI;
export const connectDB = async()=>{
    if (mongoose.connection.readyState >= 1) {
        console.log("Using existing MongoDB connection from mongoose.connection");
        return;
      }
    
    
      console.log("🔄 Connecting to MongoDB...");
      await mongoose.connect(MONGO_URI);
      console.log("✅ MongoDB Connected to:", mongoose.connection.name);
}
connectDB();