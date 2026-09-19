import type { Request, Response, NextFunction } from "express";

import {
  getInsurancePolicies,
  getInsurancePolicyById,
  createInsurancePolicy,
  updateInsurancePolicy,
  deactivateInsurancePolicy,
} from "../services/insurancePolicy.service.js";

export const getInsurancePoliciesController = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const policies = await getInsurancePolicies();

    res.status(200).json({
      success: true,
      data: policies,
    });
  } catch (error) {
    next(error);
  }
};

export const getInsurancePolicyByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid insurance policy ID",
      });
      return;
    }

    const policy = await getInsurancePolicyById(id);

    res.status(200).json({
      success: true,
      data: policy,
    });
  } catch (error) {
    next(error);
  }
};

export const createInsurancePolicyController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const policy = await createInsurancePolicy(req.body);

    res.status(201).json({
      success: true,
      data: policy,
    });
  } catch (error) {
    next(error);
  }
};

export const updateInsurancePolicyController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid insurance policy ID",
      });
      return;
    }

    const policy = await updateInsurancePolicy(id, req.body);

    res.status(200).json({
      success: true,
      data: policy,
    });
  } catch (error) {
    next(error);
  }
};

export const deactivateInsurancePolicyController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid insurance policy ID",
      });
      return;
    }

    const policy = await deactivateInsurancePolicy(id);

    res.status(200).json({
      success: true,
      message: "Insurance policy deactivated successfully",
      data: policy,
    });
  } catch (error) {
    next(error);
  }
};
