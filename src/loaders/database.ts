import Container from "typedi";
import config from "../config";
import mongoose, { Connection } from "mongoose";

export default async () => {
  return mongoose.connect("mongodb://localhost:27021/goopi");
};
