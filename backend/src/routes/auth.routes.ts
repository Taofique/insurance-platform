import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";

import { validate } from "../middleware/validate.middleware.js";
import { validateRegister } from "../validators/auth.validator.js";

const router = Router();

router.post("/register", validate(validateRegister), register);
router.post("/login", login);

export default router;
