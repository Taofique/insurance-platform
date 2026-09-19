import type { Request, Response, NextFunction } from "express";

import {
  getClaims,
  getClaimsByClient,
  getClaimById,
  createClaim,
  updateClaim,
  deactivateClaim,
} from "../services/claim.service.js";

export const getClaimsController = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const claims = await getClaims();

    res.status(200).json({
      success: true,
      data: claims,
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