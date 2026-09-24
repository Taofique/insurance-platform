import { Router } from "express";
import { register, login, me } from "../controllers/auth.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import {
  validateRegister,
  validateLogin,
} from "../validators/auth.validator.js";

const router = Router();

router.post("/register", validate(validateRegister), register);
router.post("/login", validate(validateLogin), login);
router.get("/me", authMiddleware, me);

export default router;
