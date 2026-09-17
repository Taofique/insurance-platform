import { Router } from "express";

import {
  create,
  getAll,
  getById,
} from "../controllers/insuranceType.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

import { validateCreateInsuranceType } from "../validators/insuranceType.validator.js";

const router = Router();

router.get("/", authMiddleware, getAll);

router.get("/:id", authMiddleware, getById);

router.post(
  "/",
  authMiddleware,
  authorize("admin"),
  validate(validateCreateInsuranceType),
  create,
);

export default router;
