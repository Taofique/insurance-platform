import bcrypt from "bcrypt";
import User from "../models/User.js";
import type { UserRole } from "../models/User.js";
import AppError from "../middleware/AppError.js";

interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

interface UpdateUserData {
  name?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  isActive?: boolean;
}

export const getUsers = async () => {
  return User.find().select("-password").sort({ createdAt: -1 });
};

export const getUserById = async (id: string) => {
  const user = await User.findById(id).select("-password");

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

export const createUser = async (data: CreateUserData) => {
  const { name, email, password, role } = data;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError("User already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
  };
};

// Update User
export const updateUser = async (id: string, data: UpdateUserData) => {
  const user = await User.findById(id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (data.email && data.email !== user.email) {
    const existingUser = await User.findOne({
      email: data.email,
      _id: { $ne: id },
    });

    if (existingUser) {
      throw new AppError("User already exists", 409);
    }
  }

  if (data.name !== undefined) {
    user.name = data.name;
  }

  if (data.email !== undefined) {
    user.email = data.email;
  }

  if (data.password !== undefined) {
    user.password = await bcrypt.hash(data.password, 10);
  }

  if (data.role !== undefined) {
    user.role = data.role;
  }

  if (data.isActive !== undefined) {
    user.isActive = data.isActive;
  }

  await user.save();

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
  };
};

// Deactivate User ( Not Delete)
export const deactivateUser = async (id: string) => {
  const user = await User.findById(id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  user.isActive = false;

  await user.save();

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
  };
};
