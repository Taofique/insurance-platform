import { Router } from "express";

import {
  create,
  getAll,
  getById,
  update,
  remove,
} from "../controllers/insuranceType.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { paginationMiddleware } from "../middleware/pagination.middleware.js";

import { validateCreateInsuranceType } from "../validators/insuranceType.validator.js";
import { validatePagination } from "../validators/pagination.validator.js";

const router = Router();

router.get(
  "/",
  authMiddleware,
  authorize("admin", "agent", "claims_officer"),
  validate(validatePagination),
  paginationMiddleware,
  getAll,
);

router.get("/:id", authMiddleware, getById);

// create
router.post(
  "/",
  authMiddleware,
  authorize("admin"),
  validate(validateCreateInsuranceType),
  create,
);

// update
router.patch("/:id", authMiddleware, authorize("admin"), update);

//delete
router.delete("/:id", authMiddleware, authorize("admin"), remove);

export default router;
