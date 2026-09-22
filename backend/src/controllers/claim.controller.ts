import type { Request, Response, NextFunction } from "express";
import type { ClaimStatus } from "../models/Claim.js";
import type { ClaimFilters } from "../services/claim.service.js";
import type { SortOrder, SortParams } from "../types/pagination.js";

import {
  getClaims,
  getClaimsByClient,
  getClaimById,
  createClaim,
  updateClaim,
  deactivateClaim,
} from "../services/claim.service.js";

export const getClaimsController = async (
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

    const filters: ClaimFilters = {};

    if (typeof req.query.status === "string") {
      filters.status = req.query.status as ClaimStatus;
    }

    if (typeof req.query.client === "string") {
      filters.client = req.query.client;
    }

    if (typeof req.query.policy === "string") {
      filters.policy = req.query.policy;
    }

    if (typeof req.query.claimOfficer === "string") {
      filters.claimOfficer = req.query.claimOfficer;
    }

    const sorting: SortParams = {};

    if (typeof req.query.sortBy === "string") {
      sorting.sortBy = req.query.sortBy;
    }

    if (typeof req.query.sortOrder === "string") {
      sorting.sortOrder = req.query.sortOrder as SortOrder;
    }

    const result = await getClaims(pagination, filters, sorting);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyClaimsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    const claims = await getClaimsByClient(userId);

    res.status(200).json({
      success: true,
      data: claims,
    });
  } catch (error) {
    next(error);
  }
};

export const getClaimByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid claim ID",
      });
      return;
    }

    const userId = req.userId;
    const userRole = req.userRole;

    if (!userId || !userRole) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    const claim = await getClaimById(id, userRole, userId);

    res.status(200).json({
      success: true,
      data: claim,
    });
  } catch (error) {
    next(error);
  }
};

export const createClaimController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.userId;
    const userRole = req.userRole;

    if (!userId || !userRole) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    const claim = await createClaim(req.body, userId, userRole);

    res.status(201).json({
      success: true,
      data: claim,
    });
  } catch (error) {
    next(error);
  }
};

export const updateClaimController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid claim ID",
      });
      return;
    }

    const claim = await updateClaim(id, req.body);

    res.status(200).json({
      success: true,
      data: claim,
    });
  } catch (error) {
    next(error);
  }
};

export const deactivateClaimController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid claim ID",
      });
      return;
    }

    const claim = await deactivateClaim(id);

    res.status(200).json({
      success: true,
      message: "Claim deactivated successfully",
      data: claim,
    });
  } catch (error) {
    next(error);
  }
};