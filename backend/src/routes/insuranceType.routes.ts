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

import { validateCreateInsuranceType } from "../validators/insuranceType.validator.js";

const router = Router();

router.get("/", authMiddleware, getAll);

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
