import { apiClient } from "./apiClient";
import type { LoginCredentials, LoginResponse } from "../types/auth";

export function login(credentials: LoginCredentials): Promise<LoginResponse> {
  return apiClient<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}
