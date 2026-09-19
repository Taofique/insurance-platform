import { Types } from "mongoose";

import Claim from "../models/Claim.js";
import type { ClaimStatus } from "../models/Claim.js";
import InsurancePolicy from "../models/InsurancePolicy.js";
import User from "../models/User.js";
import AppError from "../middleware/AppError.js";

interface CreateClaimData {
  policy: string;
  client?: string;
  claimOfficer?: string;
  description: string;
  amount: number;
}

interface UpdateClaimData {
  policy?: string;
  client?: string;
  claimOfficer?: string;
  description?: string;
  amount?: number;
  status?: ClaimStatus;
  isActive?: boolean;
}

const allowedStatusTransitions: Record<ClaimStatus, ClaimStatus[]> = {
  submitted: ["under_review"],
  under_review: ["approved", "rejected"],
  approved: ["paid"],
  rejected: [],
  paid: [],
};

const generateClaimNumber = (): string => {
  const timestamp = Date.now();

  return `CLM-${timestamp}`;
};

const validateClient = async (clientId: string) => {
  const client = await User.findById(clientId).select(
    "name email role isActive",
  );

  if (!client) {
    throw new AppError("Client not found", 404);
  }

  if (client.role !== "client") {
    throw new AppError("Selected user is not a client", 400);
  }

  if (!client.isActive) {
    throw new AppError("Client account is inactive", 400);
  }

  return client;
};

const validateClaimOfficer = async (claimOfficerId: string) => {
  const claimOfficer = await User.findById(claimOfficerId).select(
    "name email role isActive",
  );

  if (!claimOfficer) {
    throw new AppError("Claim officer not found", 404);
  }

  if (claimOfficer.role !== "claims_officer") {
    throw new AppError("Selected user is not a claims officer", 400);
  }

  if (!claimOfficer.isActive) {
    throw new AppError("Claim officer account is inactive", 400);
  }

  return claimOfficer;
};

const validatePolicyOwnership = async (policyId: string, clientId: string) => {
  const policy = await InsurancePolicy.findById(policyId).select(
    "policyNumber client status isActive",
  );

  if (!policy) {
    throw new AppError("Insurance policy not found", 404);
  }

  if (!policy.isActive) {
    throw new AppError("Insurance policy is inactive", 400);
  }

  if (policy.status !== "active") {
    throw new AppError("Insurance policy is not active", 400);
  }

  if (policy.client.toString() !== clientId) {
    throw new AppError("Client does not own this policy", 400);
  }

  return policy;
};

const claimPopulation = [
  {
    path: "policy",
    select: "policyNumber status",
  },
  {
    path: "client",
    select: "name email role",
  },
  {
    path: "claimOfficer",
    select: "name email role",
  },
];

export const getClaims = async () => {
  return Claim.find().populate(claimPopulation).sort({ createdAt: -1 });
};

export const getClaimsByClient = async (clientId: string) => {
  return Claim.find({
    client: new Types.ObjectId(clientId),
  })
    .populate(claimPopulation)
    .sort({ createdAt: -1 });
};

const getPopulatedClaimById = async (id: string) => {
  const claim = await Claim.findById(id).populate(claimPopulation);

  if (!claim) {
    throw new AppError("Claim not found", 404);
  }

  return claim;
};

export const getClaimById = async (
  id: string,
  authenticatedRole: string,
  authenticatedUserId: string,
) => {
  const claim = await Claim.findById(id);

  if (!claim) {
    throw new AppError("Claim not found", 404);
  }

  if (
    authenticatedRole === "client" &&
    claim.client.toString() !== authenticatedUserId
  ) {
    throw new AppError("You do not have permission to access this claim", 403);
  }

  return getPopulatedClaimById(id);
};

export const createClaim = async (
  data: CreateClaimData,
  authenticatedUserId: string,
  authenticatedRole: string,
) => {
  const { policy, description, amount, claimOfficer } = data;

  let clientId: string;

  if (authenticatedRole === "client") {
    clientId = authenticatedUserId;
  } else {
    if (!data.client) {
      throw new AppError("Client is required", 400);
    }

    clientId = data.client;
  }

  await validateClient(clientId);
  await validatePolicyOwnership(policy, clientId);

  let parsedClaimOfficer: Types.ObjectId | undefined;

  if (claimOfficer !== undefined) {
    await validateClaimOfficer(claimOfficer);

    parsedClaimOfficer = new Types.ObjectId(claimOfficer);
  }

  const claimNumber = generateClaimNumber();

  const claimData: {
    claimNumber: string;
    policy: string;
    client: Types.ObjectId;
    claimOfficer?: Types.ObjectId;
    description: string;
    amount: number;
    status: ClaimStatus;
    submittedAt: Date;
  } = {
    claimNumber,
    policy,
    client: new Types.ObjectId(clientId),
    description,
    amount,
    status: "submitted",
    submittedAt: new Date(),
  };

  if (parsedClaimOfficer !== undefined) {
    claimData.claimOfficer = parsedClaimOfficer;
  }

  const claim = await Claim.create(claimData);

  return getPopulatedClaimById(claim._id.toString());
};

export const updateClaim = async (id: string, data: UpdateClaimData) => {
  const claim = await Claim.findById(id);

  if (!claim) {
    throw new AppError("Claim not found", 404);
  }

  if (data.policy !== undefined || data.client !== undefined) {
    const effectivePolicy = data.policy ?? claim.policy.toString();

    const effectiveClient = data.client ?? claim.client.toString();

    await validateClient(effectiveClient);

    await validatePolicyOwnership(effectivePolicy, effectiveClient);
  }

  if (data.policy !== undefined) {
    claim.policy = new Types.ObjectId(data.policy);
  }

  if (data.client !== undefined) {
    claim.client = new Types.ObjectId(data.client);
  }

  if (data.claimOfficer !== undefined) {
    await validateClaimOfficer(data.claimOfficer);

    claim.claimOfficer = new Types.ObjectId(data.claimOfficer);
  }

  if (data.description !== undefined) {
    claim.description = data.description;
  }

  if (data.amount !== undefined) {
    claim.amount = data.amount;
  }

  if (data.status !== undefined) {
    const currentStatus = claim.status;

    const allowedStatuses = allowedStatusTransitions[currentStatus];

    if (!allowedStatuses.includes(data.status)) {
      throw new AppError(
        `Invalid claim status transition: ${currentStatus} → ${data.status}`,
        400,
      );
    }

    claim.status = data.status;
  }

  if (data.isActive !== undefined) {
    claim.isActive = data.isActive;
  }

  await claim.save();

  return getPopulatedClaimById(claim._id.toString());
};

export const deactivateClaim = async (id: string) => {
  const claim = await Claim.findById(id);

  if (!claim) {
    throw new AppError("Claim not found", 404);
  }

  claim.isActive = false;

  await claim.save();

  return getPopulatedClaimById(claim._id.toString());
};
