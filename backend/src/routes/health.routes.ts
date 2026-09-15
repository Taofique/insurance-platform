import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.get("/protected", authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: "You are authenticated",
    userId: req.userId,
    role: req.userRole,
  });
});

export default router;
