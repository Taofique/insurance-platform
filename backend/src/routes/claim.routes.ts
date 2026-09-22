import { Router } from "express";

import {
  getClaimsController,
  getMyClaimsController,
  getClaimByIdController,
  createClaimController,
  updateClaimController,
  deactivateClaimController,
} from "../controllers/claim.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

import {
  validateCreateClaim,
  validateUpdateClaim,
  validateClaimQuery,
} from "../validators/claim.validator.js";

import { paginationMiddleware } from "../middleware/pagination.middleware.js";
import { validatePagination } from "../validators/pagination.validator.js";

const router = Router();

router.get(
  "/my",
  authMiddleware,
  authorize("client"),
  getMyClaimsController,
);

router.get(
  "/",
  authMiddleware,
  authorize("admin", "agent", "claims_officer"),
  validate(validatePagination),
  validate(validateClaimQuery),
  paginationMiddleware,
  getClaimsController,
);

router.get(
  "/:id",
  authMiddleware,
  authorize("admin", "agent", "claims_officer", "client"),
  getClaimByIdController,
);

router.post(
  "/",
  authMiddleware,
  authorize("admin", "client"),
  validate(validateCreateClaim),
  createClaimController,
);

router.patch(
  "/:id",
  authMiddleware,
  authorize("admin", "claims_officer"),
  validate(validateUpdateClaim),
  updateClaimController,
);

router.delete(
  "/:id",
  authMiddleware,
  authorize("admin", "claims_officer"),
  deactivateClaimController,
);

export default router;