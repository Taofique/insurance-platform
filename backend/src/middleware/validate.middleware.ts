import type { Request, Response, NextFunction } from "express";

interface ValidationError {
  field: string;
  message: string;
}

type Validator = (req: Request) => ValidationError[];

export const validate = (validator: Validator) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const errors = validator(req);

    if (errors.length > 0) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
      return;
    }

    next();
  };
};
