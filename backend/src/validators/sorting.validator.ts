import type { Request } from "express";

interface ValidationError {
  field: string;
  message: string;
}

export const validateSorting = (
  req: Request,
  allowedSortFields: readonly string[],
): ValidationError[] => {
  const errors: ValidationError[] = [];

  const { sortBy, sortOrder } = req.query;

  if (sortBy !== undefined) {
    if (typeof sortBy !== "string" || !allowedSortFields.includes(sortBy)) {
      errors.push({
        field: "sortBy",
        message: `Sort field must be one of: ${allowedSortFields.join(", ")}`,
      });
    }
  }

  if (sortOrder !== undefined) {
    if (sortOrder !== "asc" && sortOrder !== "desc") {
      errors.push({
        field: "sortOrder",
        message: "Sort order must be either 'asc' or 'desc'",
      });
    }
  }

  return errors;
};