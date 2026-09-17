import mongoose, { Model, Schema } from "mongoose";
import type { HydratedDocument } from "mongoose";

export type UserRole = "admin" | "agent" | "claims_officer" | "client";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export type UserDocument = HydratedDocument<IUser>;

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    role: {
      type: String,
      enum: ["admin", "agent", "claims_officer", "client"],
      default: "client",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
