import { Router } from "express";
import {
  getUserByIdController,
  getUsersController,
  createUserController,
  updateUserController,
  deactivateUserController,
} from "../controllers/user.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

import {
  validateCreateUser,
  validateUpdateUser,
} from "../validators/user.validator.js";

const router = Router();

router.get("/", authMiddleware, authorize("admin"), getUsersController);
router.get("/:id", authMiddleware, authorize("admin"), getUserByIdController);
router.post(
  "/",
  authMiddleware,
  authorize("admin"),
  validate(validateCreateUser),
  createUserController,
);

router.patch(
  "/:id",
  authMiddleware,
  authorize("admin"),
  validate(validateUpdateUser),
  updateUserController,
);

router.delete(
  "/:id",
  authMiddleware,
  authorize("admin"),
  deactivateUserController,
);

export default router;
