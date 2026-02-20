import mongoose from "mongoose";

const connectDB = async () => {
    const MONGO_URI = process.env.MONGO_URI;
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected ");
  } catch (error) {
    console.error("MongoDB Error ", error.message);
  }
};

export default connectDB;
