import type { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service.js";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error: any) {
    const message =
      error instanceof Error ? error.message : "Registration failed";

    res.status(400).json({
      success: false,
      message,
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await loginUser(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      ...result,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Login failed";

    res.status(401).json({
      success: false,
      message,
    });
  }
};
