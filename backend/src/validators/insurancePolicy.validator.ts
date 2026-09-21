import type { Request } from "express";
import mongoose from "mongoose";

import type { PolicyStatus } from "../models/InsurancePolicy.js";

interface ValidationError {
  field: string;
  message: string;
}

const allowedStatuses: PolicyStatus[] = [
  "pending",
  "active",
  "expired",
  "cancelled",
];

const isValidObjectId = (value: unknown): boolean => {
  return typeof value === "string" && mongoose.Types.ObjectId.isValid(value);
};

export const validateCreateInsurancePolicy = (
  req: Request,
): ValidationError[] => {
  const errors: ValidationError[] = [];

  const {
    client,
    insuranceType,
    agent,
    startDate,
    endDate,
    premium,
    coverageAmount,
    status,
  } = req.body;

  if (!client) {
    errors.push({
      field: "client",
      message: "Client is required",
    });
  } else if (!isValidObjectId(client)) {
    errors.push({
      field: "client",
      message: "Invalid client ID",
    });
  }

  if (!insuranceType) {
    errors.push({
      field: "insuranceType",
      message: "Insurance type is required",
    });
  } else if (!isValidObjectId(insuranceType)) {
    errors.push({
      field: "insuranceType",
      message: "Invalid insurance type ID",
    });
  }

  if (!agent) {
    errors.push({
      field: "agent",
      message: "Agent is required",
    });
  } else if (!isValidObjectId(agent)) {
    errors.push({
      field: "agent",
      message: "Invalid agent ID",
    });
  }

  if (!startDate) {
    errors.push({
      field: "startDate",
      message: "Start date is required",
    });
  } else if (Number.isNaN(Date.parse(startDate))) {
    errors.push({
      field: "startDate",
      message: "Invalid start date",
    });
  }

  if (!endDate) {
    errors.push({
      field: "endDate",
      message: "End date is required",
    });
  } else if (Number.isNaN(Date.parse(endDate))) {
    errors.push({
      field: "endDate",
      message: "Invalid end date",
    });
  }

  if (premium === undefined) {
    errors.push({
      field: "premium",
      message: "Premium is required",
    });
  } else if (typeof premium !== "number" || premium < 0) {
    errors.push({
      field: "premium",
      message: "Premium must be a non-negative number",
    });
  }

  if (coverageAmount === undefined) {
    errors.push({
      field: "coverageAmount",
      message: "Coverage amount is required",
    });
  } else if (typeof coverageAmount !== "number" || coverageAmount < 0) {
    errors.push({
      field: "coverageAmount",
      message: "Coverage amount must be a non-negative number",
    });
  }

  if (status !== undefined) {
    if (
      typeof status !== "string" ||
      !allowedStatuses.includes(status as PolicyStatus)
    ) {
      errors.push({
        field: "status",
        message: "Invalid policy status",
      });
    }
  }

  return errors;
};

export const validateUpdateInsurancePolicy = (
  req: Request,
): ValidationError[] => {
  const errors: ValidationError[] = [];

  const {
    client,
    insuranceType,
    agent,
    startDate,
    endDate,
    premium,
    coverageAmount,
    status,
    isActive,
  } = req.body;

  if (client !== undefined) {
    if (!isValidObjectId(client)) {
      errors.push({
        field: "client",
        message: "Invalid client ID",
      });
    }
  }

  if (insuranceType !== undefined) {
    if (!isValidObjectId(insuranceType)) {
      errors.push({
        field: "insuranceType",
        message: "Invalid insurance type ID",
      });
    }
  }

  if (agent !== undefined) {
    if (!isValidObjectId(agent)) {
      errors.push({
        field: "agent",
        message: "Invalid agent ID",
      });
    }
  }

  if (startDate !== undefined) {
    if (typeof startDate !== "string" || Number.isNaN(Date.parse(startDate))) {
      errors.push({
        field: "startDate",
        message: "Invalid start date",
      });
    }
  }

  if (endDate !== undefined) {
    if (typeof endDate !== "string" || Number.isNaN(Date.parse(endDate))) {
      errors.push({
        field: "endDate",
        message: "Invalid end date",
      });
    }
  }

  if (premium !== undefined) {
    if (typeof premium !== "number" || premium < 0) {
      errors.push({
        field: "premium",
        message: "Premium must be a non-negative number",
      });
    }
  }

  if (coverageAmount !== undefined) {
    if (typeof coverageAmount !== "number" || coverageAmount < 0) {
      errors.push({
        field: "coverageAmount",
        message: "Coverage amount must be a non-negative number",
      });
    }
  }

  if (status !== undefined) {
    if (
      typeof status !== "string" ||
      !allowedStatuses.includes(status as PolicyStatus)
    ) {
      errors.push({
        field: "status",
        message: "Invalid policy status",
      });
    }
  }

  if (isActive !== undefined) {
    if (typeof isActive !== "boolean") {
      errors.push({
        field: "isActive",
        message: "isActive must be a boolean",
      });
    }
  }

  return errors;
};

export const validateInsurancePolicyQuery = (
  req: Request,
): ValidationError[] => {
  const errors: ValidationError[] = [];

  const { status, client, agent, insuranceType } = req.query;

  if (status !== undefined) {
    const validStatuses: PolicyStatus[] = [
      "pending",
      "active",
      "expired",
      "cancelled",
    ];

    if (
      typeof status !== "string" ||
      !validStatuses.includes(status as PolicyStatus)
    ) {
      errors.push({
        field: "status",
        message: "Status must be one of: pending, active, expired, cancelled",
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

  if (agent !== undefined) {
    if (typeof agent !== "string" || !mongoose.isValidObjectId(agent)) {
      errors.push({
        field: "agent",
        message: "Invalid agent ID",
      });
    }
  }

  if (insuranceType !== undefined) {
    if (
      typeof insuranceType !== "string" ||
      !mongoose.isValidObjectId(insuranceType)
    ) {
      errors.push({
        field: "insuranceType",
        message: "Invalid insurance type ID",
      });
    }
  }

  return errors;
};
