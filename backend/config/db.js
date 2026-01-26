import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log(`Connecting to...${process.env.MONGODB_URL}`);
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connected sucessfully !");
  } catch (error) {
    console.error("MongoDB connection failed: ", error);
    process.exit(1);
  }
};
