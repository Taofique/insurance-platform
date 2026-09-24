import type { NextFunction, Request, Response } from "express";

import {
  createInsuranceType,
  getInsuranceTypes,
  getInsuranceTypeById,
  updateInsuranceType,
  deactivateInsuranceType,
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
      data: insuranceType,
    });
  } catch (error) {
    next(error);
  }
};

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const pagination = req.pagination;

    if (!pagination) {
      res.status(500).json({
        success: false,
        message: "Pagination was not initialized",
      });
      return;
    }

    const result = await getInsuranceTypes(pagination);

    res.status(200).json({
      success: true,
      ...result,
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
      data: insuranceType,
    });
  } catch (error) {
    next(error);
  }
};

export const update = async (
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

    const insuranceType = await updateInsuranceType(id, req.body);

    res.status(200).json({
      success: true,
      message: "Insurance type updated successfully",
      data: insuranceType,
    });
  } catch (error) {
    next(error);
  }
};

export const deactivateInsuranceTypeController = async (
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

    const insuranceType = await deactivateInsuranceType(id);

    res.status(200).json({
      success: true,
      message: "Insurance type deactivated successfully",
      data: insuranceType,
    });
  } catch (error) {
    next(error);
  }
};
