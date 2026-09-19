import { Router } from "express";

import {
  getInsurancePoliciesController,
  getInsurancePolicyByIdController,
  createInsurancePolicyController,
  updateInsurancePolicyController,
  deactivateInsurancePolicyController,
} from "../controllers/insurancePolicy.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

import {
  validateCreateInsurancePolicy,
  validateUpdateInsurancePolicy,
} from "../validators/insurancePolicy.validator.js";

const router = Router();

router.get(
  "/",
  authMiddleware,
  authorize("admin", "agent", "claims_officer"),
  getInsurancePoliciesController,
);

router.get(
  "/:id",
  authMiddleware,
  authorize("admin", "agent", "claims_officer"),
  getInsurancePolicyByIdController,
);

router.post(
  "/",
  authMiddleware,
  authorize("admin", "agent"),
  validate(validateCreateInsurancePolicy),
  createInsurancePolicyController,
);

router.patch(
  "/:id",
  authMiddleware,
  authorize("admin", "agent"),
  validate(validateUpdateInsurancePolicy),
  updateInsurancePolicyController,
);

router.delete(
  "/:id",
  authMiddleware,
  authorize("admin", "agent"),
  deactivateInsurancePolicyController,
);

export default router;
