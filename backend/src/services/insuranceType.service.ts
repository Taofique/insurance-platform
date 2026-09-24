import InsuranceType from "../models/InsuranceType.js";
import AppError from "../middleware/AppError.js";
import type { PaginationParams } from "../types/pagination.js";

interface CreateInsuranceTypeData {
  name: string;
  description: string;
}

interface UpdateInsuranceTypeData {
  name?: string;
  description?: string;
  isActive?: boolean;
}

export const createInsuranceType = async (data: CreateInsuranceTypeData) => {
  const { name, description } = data;

  const existingType = await InsuranceType.findOne({ name });

  if (existingType) {
    throw new AppError("Insurance type already exists", 409);
  }

  return InsuranceType.create({
    name,
    description,
  });
};

export const getInsuranceTypes = async ({ page, limit }: PaginationParams) => {
  const skip = (page - 1) * limit;

  const [insuranceTypes, total] = await Promise.all([
    InsuranceType.find().sort({ createdAt: -1 }).skip(skip).limit(limit),

    InsuranceType.countDocuments(),
  ]);

  return {
    data: insuranceTypes,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getInsuranceTypeById = async (id: string) => {
  const insuranceType = await InsuranceType.findById(id);

  if (!insuranceType) {
    throw new AppError("Insurance type not found", 404);
  }

  return insuranceType;
};

export const updateInsuranceType = async (
  id: string,
  data: UpdateInsuranceTypeData,
) => {
  const insuranceType = await InsuranceType.findById(id);

  if (!insuranceType) {
    throw new AppError("Insurance type not found", 404);
  }

  if (data.name && data.name !== insuranceType.name) {
    const existingType = await InsuranceType.findOne({
      name: data.name,
      _id: { $ne: id },
    });

    if (existingType) {
      throw new AppError("Insurance type already exists", 409);
    }
  }

  Object.assign(insuranceType, data);

  return insuranceType.save();
};

// Deactivate Insurance Type (Not Delete)
export const deactivateInsuranceType = async (id: string) => {
  const insuranceType = await InsuranceType.findById(id);

  if (!insuranceType) {
    throw new AppError("Insurance type not found", 404);
  }

  insuranceType.isActive = false;

  await insuranceType.save();

  return insuranceType;
};
