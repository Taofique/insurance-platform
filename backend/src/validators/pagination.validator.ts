import type { Request } from "express";

interface ValidationError {
  field: string;
  message: string;
}

export const validatePagination = (req: Request): ValidationError[] => {
  const errors: ValidationError[] = [];

  const { page, limit } = req.query;

  if (page !== undefined) {
    const parsedPage = Number(page);

    if (!Number.isInteger(parsedPage) || parsedPage < 1) {
      errors.push({
        field: "page",
        message: "Page must be a positive integer",
      });
    }
  }

  if (limit !== undefined) {
    const parsedLimit = Number(limit);

    if (
      !Number.isInteger(parsedLimit) ||
      parsedLimit < 1 ||
      parsedLimit > 100
    ) {
      errors.push({
        field: "limit",
        message: "Limit must be an integer between 1 and 100",
      });
    }
  }

  return errors;
};
