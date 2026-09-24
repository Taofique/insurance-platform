import type { UserRole } from "./types/auth";

export const DASHBOARD_BY_ROLE: Record<UserRole, string> = {
  client: "/customer/dashboard",
  agent: "/agent/dashboard",
  admin: "/admin/dashboard",
  claims_officer: "/claims-officer/dashboard",
};

export const ROLE_LABEL: Record<UserRole, string> = {
  client: "Customer",
  agent: "Agent",
  admin: "Administrator",
  claims_officer: "Claims Officer",
};

export function getDashboardPath(role: UserRole): string {
  return DASHBOARD_BY_ROLE[role];
}