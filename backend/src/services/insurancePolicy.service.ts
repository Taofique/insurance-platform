import { Types } from "mongoose";

import InsurancePolicy from "../models/InsurancePolicy.js";
import User from "../models/User.js";
import InsuranceType from "../models/InsuranceType.js";
import AppError from "../middleware/AppError.js";

interface CreateInsurancePolicyData {
  client: string;
  insuranceType: string;
  agent: string;
  startDate: string;
  endDate: string;
  premium: number;
  coverageAmount: number;
  status?: "pending" | "active" | "expired" | "cancelled";
}

interface UpdateInsurancePolicyData {
  client?: string;
  insuranceType?: string;
  agent?: string;
  startDate?: string;
  endDate?: string;
  premium?: number;
  coverageAmount?: number;
  status?: "pending" | "active" | "expired" | "cancelled";
  isActive?: boolean;
}

const generatePolicyNumber = (): string => {
  const timestamp = Date.now();

  return `POL-${timestamp}`;
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

const validateAgent = async (agentId: string) => {
  const agent = await User.findById(agentId).select("name email role isActive");

  if (!agent) {
    throw new AppError("Agent not found", 404);
  }

  if (agent.role !== "agent") {
    throw new AppError("Selected user is not an agent", 400);
  }

  if (!agent.isActive) {
    throw new AppError("Agent account is inactive", 400);
  }

  return agent;
};

const validateInsuranceType = async (insuranceTypeId: string) => {
  const insuranceType = await InsuranceType.findById(insuranceTypeId);

  if (!insuranceType) {
    throw new AppError("Insurance type not found", 404);
  }

  if (!insuranceType.isActive) {
    throw new AppError("Insurance type is inactive", 400);
  }

  return insuranceType;
};

export const getInsurancePolicies = async () => {
  return InsurancePolicy.find()
    .populate("client", "name email role")
    .populate("agent", "name email role")
    .populate("insuranceType", "name description")
    .sort({ createdAt: -1 });
};

export const getInsurancePolicyById = async (id: string) => {
  const policy = await InsurancePolicy.findById(id)
    .populate("client", "name email role")
    .populate("agent", "name email role")
    .populate("insuranceType", "name description");

  if (!policy) {
    throw new AppError("Insurance policy not found", 404);
  }

  return policy;
};

export const createInsurancePolicy = async (
  data: CreateInsurancePolicyData,
) => {
  const {
    client,
    insuranceType,
    agent,
    startDate,
    endDate,
    premium,
    coverageAmount,
    status = "pending",
  } = data;

  await validateClient(client);
  await validateAgent(agent);
  await validateInsuranceType(insuranceType);

  const parsedStartDate = new Date(startDate);
  const parsedEndDate = new Date(endDate);

  if (parsedEndDate <= parsedStartDate) {
    throw new AppError("End date must be after start date", 400);
  }

  const policyNumber = generatePolicyNumber();

  const policy = await InsurancePolicy.create({
    policyNumber,
    client,
    insuranceType,
    agent,
    startDate: parsedStartDate,
    endDate: parsedEndDate,
    premium,
    coverageAmount,
    status,
  });

  return getInsurancePolicyById(policy._id.toString());
};

export const updateInsurancePolicy = async (
  id: string,
  data: UpdateInsurancePolicyData,
) => {
  const policy = await InsurancePolicy.findById(id);

  if (!policy) {
    throw new AppError("Insurance policy not found", 404);
  }

  if (data.client !== undefined) {
    await validateClient(data.client);

    policy.client = new Types.ObjectId(data.client);
  }

  if (data.agent !== undefined) {
    await validateAgent(data.agent);

    policy.agent = new Types.ObjectId(data.agent);
  }

  if (data.insuranceType !== undefined) {
    await validateInsuranceType(data.insuranceType);

    policy.insuranceType = new Types.ObjectId(data.insuranceType);
  }

  if (data.startDate !== undefined) {
    policy.startDate = new Date(data.startDate);
  }

  if (data.endDate !== undefined) {
    policy.endDate = new Date(data.endDate);
  }

  if (data.startDate !== undefined || data.endDate !== undefined) {
    if (policy.endDate <= policy.startDate) {
      throw new AppError("End date must be after start date", 400);
    }
  }

  if (data.premium !== undefined) {
    policy.premium = data.premium;
  }

  if (data.coverageAmount !== undefined) {
    policy.coverageAmount = data.coverageAmount;
  }

  if (data.status !== undefined) {
    policy.status = data.status;
  }

  if (data.isActive !== undefined) {
    policy.isActive = data.isActive;
  }

  await policy.save();

  return getInsurancePolicyById(policy._id.toString());
};

export const deactivateInsurancePolicy = async (id: string) => {
  const policy = await InsurancePolicy.findById(id);

  if (!policy) {
    throw new AppError("Insurance policy not found", 404);
  }

  policy.isActive = false;

  await policy.save();

  return getInsurancePolicyById(policy._id.toString());
};
