import type { Request } from "express";

interface ValidationError {
  field: string;
  message: string;
}

export const validateRegister = (req: Request): ValidationError[] => {
  const errors: ValidationError[] = [];

  const { name, email, password } = req.body;

  if (!name || typeof name !== "string" || !name.trim()) {
    errors.push({
      field: "name",
      message: "Name is required",
    });
  }

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

  return errors;
};

// Login Validation

export const validateLogin = (req: Request): ValidationError[] => {
  const errors: ValidationError[] = [];

  const { email, password } = req.body;

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

  if (!password || typeof password !== "string") {
    errors.push({
      field: "password",
      message: "Password is required",
    });
  }

  return errors;
};
