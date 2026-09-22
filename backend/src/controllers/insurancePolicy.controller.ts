import type { Request, Response, NextFunction } from "express";
import type { PolicyStatus } from "../models/InsurancePolicy.js";
import type { InsurancePolicyFilters } from "../services/insurancePolicy.service.js";
import type { SortOrder, SortParams } from "../types/pagination.js";

import {
  getInsurancePolicies,
  getInsurancePolicyById,
  createInsurancePolicy,
  updateInsurancePolicy,
  deactivateInsurancePolicy,
  getInsurancePoliciesByClient,
} from "../services/insurancePolicy.service.js";

export const getInsurancePoliciesController = async (
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

    const filters: InsurancePolicyFilters = {};

    if (typeof req.query.status === "string") {
      filters.status = req.query.status as PolicyStatus;
    }

    if (typeof req.query.client === "string") {
      filters.client = req.query.client;
    }

    if (typeof req.query.agent === "string") {
      filters.agent = req.query.agent;
    }

    if (typeof req.query.insuranceType === "string") {
      filters.insuranceType = req.query.insuranceType;
    }

    const sorting: SortParams = {};

    if (typeof req.query.sortBy === "string") {
      sorting.sortBy = req.query.sortBy;
    }

    if (typeof req.query.sortOrder === "string") {
      sorting.sortOrder = req.query.sortOrder as SortOrder;
    }

    const result = await getInsurancePolicies(pagination, filters, sorting);

    res.status(200).json({
      success: true,
      ...result,
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

export const getMyInsurancePoliciesController = async (
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

    if (!req.userId) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    const result = await getInsurancePoliciesByClient(req.userId, pagination);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};
