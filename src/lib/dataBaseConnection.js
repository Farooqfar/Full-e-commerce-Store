import mongoose from "mongoose";
const mongo_db = process.env.MONGODB_URL;
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promises: null,
  };
}

export const connectDB = async () => {
  if (cached.conn) return cached.conn;
  if (!cached.promises) {
    cached.promises = mongoose
      .connect(mongo_db, {
        dbName: "FullStore",
        bufferCommands: false,
      })
      .then((mongoose) => {
        return mongoose;
      })
      .then((mongoose) => {
        return mongoose;
      });
  }

  cached.conn = await cached.promises;
  return cached.conn;
};
