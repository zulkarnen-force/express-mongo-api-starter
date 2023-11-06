import mongoose, { Schema } from "mongoose";
import User from "./User";

const schema = new Schema<User>({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  about: {
    type: String,
  },
  role: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

schema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v; // Optionally remove the version field as well
    ret.timestamps = {};
    ret.timestamps.created_at = ret.created_at;
    ret.timestamps.updated_at = ret.updated_at;
    delete ret.created_at;
    delete ret.updated_at;
  },
});

schema.method("mapTimestamps", function () {
  return {
    id: this.id,
    timestamps: {
      created_at: this.created_at,
      updated_at: this.updated_at,
    },
  };
});

const UserMongo = mongoose.model<User>("User", schema);
export default UserMongo;
