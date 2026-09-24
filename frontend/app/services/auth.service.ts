import { apiClient } from "./apiClient";

import type {
  LoginCredentials,
  LoginResponse,
  LogoutResponse,
  MeResponse,
} from "../types/auth";

export function login(credentials: LoginCredentials): Promise<LoginResponse> {
  return apiClient<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export function getMe(): Promise<MeResponse> {
  return apiClient<MeResponse>("/auth/me");
}

export function logout(): Promise<LogoutResponse> {
  return apiClient<LogoutResponse>("/auth/logout", {
    method: "POST",
  });
}
