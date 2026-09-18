import InsuranceType from "../models/InsuranceType.js";
import AppError from "../middleware/AppError.js";

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

export const getInsuranceTypes = async () => {
  return InsuranceType.find().sort({ createdAt: -1 });
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

export const deleteInsuranceType = async (id: string) => {
  const insuranceType = await InsuranceType.findById(id);

  if (!insuranceType) {
    throw new AppError("Insurance type not found", 404);
  }

  await insuranceType.deleteOne();
};
