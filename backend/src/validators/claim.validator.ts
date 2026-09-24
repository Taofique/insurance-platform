import type { Request } from "express";
import mongoose from "mongoose";

import type { ClaimStatus } from "../models/Claim.js";
import { validateSorting } from "./sorting.validator.js";

interface ValidationError {
  field: string;
  message: string;
}

const allowedStatuses: ClaimStatus[] = [
  "submitted",
  "under_review",
  "approved",
  "rejected",
  "paid",
];

const allowedSortFields = [
  "createdAt",
  "updatedAt",
  "submittedAt",
  "amount",
  "status",
] as const;

const isValidObjectId = (value: unknown): boolean => {
  return typeof value === "string" && mongoose.Types.ObjectId.isValid(value);
};

export const validateCreateClaim = (req: Request): ValidationError[] => {
  const errors: ValidationError[] = [];

  const { policy, client, claimOfficer, description, amount, status, isActive } =
    req.body;

  if (!policy) {
    errors.push({
      field: "policy",
      message: "Policy is required",
    });
  } else if (!isValidObjectId(policy)) {
    errors.push({
      field: "policy",
      message: "Invalid policy ID",
    });
  }

  if (client !== undefined) {
    if (!isValidObjectId(client)) {
      errors.push({
        field: "client",
        message: "Invalid client ID",
      });
    }
  }

  if (claimOfficer !== undefined) {
    if (!isValidObjectId(claimOfficer)) {
      errors.push({
        field: "claimOfficer",
        message: "Invalid claim officer ID",
      });
    }
  }

  if (!description || typeof description !== "string" || !description.trim()) {
    errors.push({
      field: "description",
      message: "Description is required",
    });
  }

  if (amount === undefined) {
    errors.push({
      field: "amount",
      message: "Amount is required",
    });
  } else if (typeof amount !== "number" || amount < 0) {
    errors.push({
      field: "amount",
      message: "Amount must be a non-negative number",
    });
  }

  if (status !== undefined) {
    errors.push({
      field: "status",
      message: "status is controlled by the system and cannot be set directly",
    });
  }

  if (isActive !== undefined) {
    errors.push({
      field: "isActive",
      message: "isActive is controlled by the system and cannot be set directly",
    });
  }

  return errors;
};

export const validateUpdateClaim = (req: Request): ValidationError[] => {
  const errors: ValidationError[] = [];

  const { policy, client, claimOfficer, description, amount, status, isActive } =
    req.body;

  if (policy !== undefined) {
    if (!isValidObjectId(policy)) {
      errors.push({
        field: "policy",
        message: "Invalid policy ID",
      });
    }
  }

  if (client !== undefined) {
    if (!isValidObjectId(client)) {
      errors.push({
        field: "client",
        message: "Invalid client ID",
      });
    }
  }

  if (claimOfficer !== undefined) {
    if (!isValidObjectId(claimOfficer)) {
      errors.push({
        field: "claimOfficer",
        message: "Invalid claim officer ID",
      });
    }
  }

  if (description !== undefined) {
    if (typeof description !== "string" || !description.trim()) {
      errors.push({
        field: "description",
        message: "Description cannot be empty",
      });
    }
  }

  if (amount !== undefined) {
    if (typeof amount !== "number" || amount < 0) {
      errors.push({
        field: "amount",
        message: "Amount must be a non-negative number",
      });
    }
  }

  if (status !== undefined) {
    if (
      typeof status !== "string" ||
      !allowedStatuses.includes(status as ClaimStatus)
    ) {
      errors.push({
        field: "status",
        message: "Invalid claim status",
      });
    }
  }

  if (isActive !== undefined) {
    errors.push({
      field: "isActive",
      message: "isActive is controlled by the system and cannot be set directly",
    });
  }

  return errors;
};

export const validateClaimQuery = (req: Request): ValidationError[] => {
  const errors: ValidationError[] = [];

  const { status, client, policy, claimOfficer } = req.query;

  if (status !== undefined) {
    if (
      typeof status !== "string" ||
      !allowedStatuses.includes(status as ClaimStatus)
    ) {
      errors.push({
        field: "status",
        message:
          "Status must be one of: submitted, under_review, approved, rejected, paid",
      });
    }
  }

  if (client !== undefined) {
    if (typeof client !== "string" || !mongoose.isValidObjectId(client)) {
      errors.push({
        field: "client",
        message: "Invalid client ID",
      });
    }
  }

  if (policy !== undefined) {
    if (typeof policy !== "string" || !mongoose.isValidObjectId(policy)) {
      errors.push({
        field: "policy",
        message: "Invalid policy ID",
      });
    }
  }

  if (claimOfficer !== undefined) {
    if (
      typeof claimOfficer !== "string" ||
      !mongoose.isValidObjectId(claimOfficer)
    ) {
      errors.push({
        field: "claimOfficer",
        message: "Invalid claim officer ID",
      });
    }
  }

  errors.push(...validateSorting(req, allowedSortFields));

  return errors;
};