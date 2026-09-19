import mongoose, { Model, Schema, Types } from "mongoose";
import type { HydratedDocument } from "mongoose";

export type ClaimStatus =
  | "submitted"
  | "under_review"
  | "approved"
  | "rejected"
  | "paid";

export interface IClaim {
  claimNumber: string;
  policy: Types.ObjectId;
  client: Types.ObjectId;
  claimOfficer?: Types.ObjectId;
  description: string;
  amount: number;
  status: ClaimStatus;
  submittedAt: Date;
  isActive: boolean;
}

export type ClaimDocument = HydratedDocument<IClaim>;

const claimSchema = new Schema<IClaim>(
  {
    claimNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    policy: {
      type: Schema.Types.ObjectId,
      ref: "InsurancePolicy",
      required: true,
    },

    client: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    claimOfficer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ["submitted", "under_review", "approved", "rejected", "paid"],
      default: "submitted",
      required: true,
    },

    submittedAt: {
      type: Date,
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

const Claim: Model<IClaim> = mongoose.model<IClaim>("Claim", claimSchema);

export default Claim;