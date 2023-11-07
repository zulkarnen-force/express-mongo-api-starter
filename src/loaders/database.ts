import Container from "typedi";
import config from "../config";
import mongoose, { Connection } from "mongoose";

export default async () => {
  return mongoose.connect(
    process.env.MONGO_URI || "mongodb://localhost:27021/goopi"
  );
};
