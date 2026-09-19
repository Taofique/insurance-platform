import express from "express";
import authRoutes from "./routes/auth.routes.js";
import healthRoutes from "./routes/health.routes.js";
import InsuranceTypeRoutes from "./routes/insuranceType.routes.js";
import userRoutes from "./routes/user.routes.js";
import insurancePolicyRoutes from "./routes/insurancePolicy.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import { loggerMiddleware } from "./middleware/logger.middleware.js";
const app = express();

app.use(express.json());

app.use(loggerMiddleware);

app.use("/api/auth", authRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/insurance-type", InsuranceTypeRoutes);
app.use("/api/insurance-policies", insurancePolicyRoutes);
app.use("/api/users", userRoutes);

app.use(errorMiddleware);

export default app;
