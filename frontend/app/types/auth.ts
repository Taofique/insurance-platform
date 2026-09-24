export type UserRole = "admin" | "agent" | "claims_officer" | "client";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: true;
  message: string;
  user: AuthUser;
}

export interface MeResponse {
  success: true;
  user: AuthUser;
}

export interface LogoutResponse {
  success: true;
  message: string;
}
