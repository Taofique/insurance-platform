import InsuranceType from "../models/InsuranceType.js";
import AppError from "../middleware/AppError.js";

interface CreateInsuranceTypeData {
  name: string;
  description: string;
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
