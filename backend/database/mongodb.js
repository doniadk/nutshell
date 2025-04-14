import mongoose from "mongoose";
import { DB_URL, NODE_ENV } from "../config/env.js";

if (!DB_URL) {
  throw new Error(
    "Please define the MONGODB_URL enviroment variable inside .env.local"
  );
}

const connectToDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log(`Connected to database in ${NODE_ENV} mode`);
  } catch (error) {
    console.log("error connecting to database: ", error);
  }
};

export default connectToDB;
