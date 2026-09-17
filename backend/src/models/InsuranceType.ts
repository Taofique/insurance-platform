import mongoose, { Model, Schema } from "mongoose";

import type { HydratedDocument } from "mongoose";

export interface IInsuranceType {
  name: string;
  description: string;
  isActive: boolean;
}

export type InsuranceTypeDocument = HydratedDocument<IInsuranceType>;

const insuranceTypeSchema = new Schema<IInsuranceType>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const InsuranceType: Model<IInsuranceType> = mongoose.model<IInsuranceType>(
  "InsuranceType",
  insuranceTypeSchema,
);

export default InsuranceType;
