import mongoose, { Model, Schema, Types } from "mongoose";
import type { HydratedDocument } from "mongoose";
export type PolicyStatus = "pending" | "active" | "expired" | "cancelled";

export interface IInsurancePolicy {
  policyNumber: string;
  client: Types.ObjectId;
  insuranceType: Types.ObjectId;
  agent: Types.ObjectId;
  startDate: Date;
  endDate: Date;
  premium: number;
  coverageAmount: number;
  status: PolicyStatus;
  isActive: boolean;
}

export type InsurancePolicyDocument = HydratedDocument<IInsurancePolicy>;

const insurancePolicySchema = new Schema<IInsurancePolicy>(
  {
    policyNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    client: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    insuranceType: {
      type: Schema.Types.ObjectId,
      ref: "InsuranceType",
      required: true,
    },

    agent: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    premium: {
      type: Number,
      required: true,
      min: 0,
    },

    coverageAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ["pending", "active", "expired", "cancelled"],
      default: "pending",
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const InsurancePolicy: Model<IInsurancePolicy> =
  mongoose.model<IInsurancePolicy>("InsurancePolicy", insurancePolicySchema);

export default InsurancePolicy;
