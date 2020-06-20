import mongoose from "mongoose";
import { MONGO_URI } from "./env.config";
import colors from "colors";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${MONGO_URI}`, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    console.log(colors.cyan(`MongoDB running on: ${conn.connection.host}`));
  } catch (error) {
    console.log(error);
  }
};
