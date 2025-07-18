import mongoose from "mongoose";
import { TUserModel } from "./models/Test1";

const url = process.env.DATABASE_URL;
console.log("DATABASE_URL:", process.env.DATABASE_URL);
if (!url) throw new Error("Database url not found");
export type { TUserModel };

let connection: null | Promise<mongoose.Mongoose> = null;

const connectDb = async (
  uri: string = url,
  options: mongoose.ConnectOptions = { connectTimeoutMS: 3_000 }
) => {
  try {
    if (!connection) {
      connection = mongoose.connect(uri, options);
    }
    await connection;
    return { TUserModel };
  } catch (e) {
    throw new Error("Failed to connect to MongoDB", { cause: e });
  }
};

export type DB = Awaited<ReturnType<typeof connectDb>>;
export default connectDb;
