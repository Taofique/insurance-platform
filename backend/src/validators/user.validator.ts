import type { Request } from "express";
import type { UserRole } from "../models/User.js";

interface ValidationError {
  field: string;
  message: string;
}

const allowedRoles: UserRole[] = ["admin", "agent", "claims_officer", "client"];

export const validateCreateUser = (req: Request): ValidationError[] => {
  const errors: ValidationError[] = [];

  const { name, email, password, role } = req.body;

  // Name
  if (!name || typeof name !== "string" || !name.trim()) {
    errors.push({
      field: "name",
      message: "Name is required",
    });
  }

  // Email
  if (!email || typeof email !== "string") {
    errors.push({
      field: "email",
      message: "Email is required",
    });
  } else if (!email.includes("@")) {
    errors.push({
      field: "email",
      message: "Please provide a valid email",
    });
  }

  // Password
  if (!password || typeof password !== "string") {
    errors.push({
      field: "password",
      message: "Password is required",
    });
  } else if (password.length < 6) {
    errors.push({
      field: "password",
      message: "Password must be at least 6 characters",
    });
  }

  // Role
  if (!role || typeof role !== "string") {
    errors.push({
      field: "role",
      message: "Role is required",
    });
  } else if (!allowedRoles.includes(role as UserRole)) {
    errors.push({
      field: "role",
      message: "Invalid role",
    });
  }

  return errors;
};

export const validateUpdateUser = (req: Request): ValidationError[] => {
  const errors: ValidationError[] = [];

  const { name, email, password, role, isActive } = req.body;

  if (name !== undefined) {
    if (typeof name !== "string" || !name.trim()) {
      errors.push({
        field: "name",
        message: "Name cannot be empty",
      });
    }
  }

  if (email !== undefined) {
    if (typeof email !== "string" || !email.trim()) {
      errors.push({
        field: "email",
        message: "Email cannot be empty",
      });
    } else if (!email.includes("@")) {
      errors.push({
        field: "email",
        message: "Please provide a valid email",
      });
    }
  }

  if (password !== undefined) {
    if (typeof password !== "string") {
      errors.push({
        field: "password",
        message: "Password must be a string",
      });
    } else if (password.length < 6) {
      errors.push({
        field: "password",
        message: "Password must be at least 6 characters",
      });
    }
  }

  if (role !== undefined) {
    if (typeof role !== "string" || !allowedRoles.includes(role as UserRole)) {
      errors.push({
        field: "role",
        message: "Invalid role",
      });
    }
  }

  if (isActive !== undefined) {
    if (typeof isActive !== "boolean") {
      errors.push({
        field: "isActive",
        message: "isActive must be a boolean",
      });
    }
  }

  return errors;
};
