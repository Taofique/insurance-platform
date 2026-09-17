import type { Request } from "express";

interface ValidationError {
  field: string;
  message: string;
}

export const validateCreateInsuranceType = (
  req: Request,
): ValidationError[] => {
  const errors: ValidationError[] = [];

  const { name, description } = req.body;

  if (!name || typeof name !== "string" || !name.trim()) {
    errors.push({
      field: "name",
      message: "Name is required",
    });
  }

  if (!description || typeof description !== "string" || !description.trim()) {
    errors.push({
      field: "description",
      message: "Description is required",
    });
  }

  return errors;
};
