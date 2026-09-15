import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";

const router = Router();

router.get("/protected", authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: "You are authenticated",
    userId: req.userId,
    role: req.userRole,
  });
});

// Authorize check
router.get("/admin", authMiddleware, authorize("admin"), (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome admin",
    userId: req.userId,
    role: req.userRole,
  });
});

router.get(
  "/claims",
  authMiddleware,
  authorize("claims_officer"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome claims officer",
      userId: req.userId,
      role: req.userRole,
    });
  },
);

router.get(
  "/management",
  authMiddleware,
  authorize("admin", "agent"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Management access granted",
      userId: req.userId,
      role: req.userRole,
    });
  },
);

export default router;
