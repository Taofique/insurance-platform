import type { NextFunction, Request, Response } from "express";

import {
  createInsuranceType,
  getInsuranceTypes,
  getInsuranceTypeById,
} from "../services/insuranceType.service.js";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const insuranceType = await createInsuranceType(req.body);

    res.status(201).json({
      success: true,
      message: "Insurance type created successfully",
      insuranceType,
    });
  } catch (error) {
    next(error);
  }
};

export const getAll = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const insuranceTypes = await getInsuranceTypes();

    res.status(200).json({
      success: true,
      insuranceTypes,
    });
  } catch (error) {
    next(error);
  }
};

export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid insurance type ID",
      });
      return;
    }

    const insuranceType = await getInsuranceTypeById(id);

    res.status(200).json({
      success: true,
      insuranceType,
    });
  } catch (error) {
    next(error);
  }
};
