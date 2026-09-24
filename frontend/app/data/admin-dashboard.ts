import type { UserRole } from "../types/auth";

export interface AdminUserSummary {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  date: string;
  status: "active" | "inactive";
}

export interface AdminClaimSummary {
  id: number;
  reference: string;
  client: string;
  type: string;
  date: string;
  amount: string;
  status: "submitted" | "under_review" | "approved" | "rejected" | "paid";
}

export interface AdminInsuranceTypeSummary {
  id: number;
  name: string;
  description: string;
  status: "active" | "inactive";
  policies: number;
}

export const adminRecentUsers: AdminUserSummary[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@email.com",
    role: "agent",
    date: "Sep 12, 2026",
    status: "active",
  },
  {
    id: 2,
    name: "Tarif Al-Mozahed",
    email: "tarif@email.com",
    role: "client",
    date: "Sep 5, 2026",
    status: "active",
  },
  {
    id: 3,
    name: "Sadia Rahman",
    email: "sadia@email.com",
    role: "claims_officer",
    date: "Aug 28, 2026",
    status: "active",
  },
  {
    id: 4,
    name: "Rafiqul Islam",
    email: "rafiq@email.com",
    role: "client",
    date: "Aug 20, 2026",
    status: "inactive",
  },
];

export const adminRecentClaims: AdminClaimSummary[] = [
  {
    id: 1,
    reference: "CLM-2026-1045",
    client: "Ahmed Hasan",
    type: "Health Insurance",
    date: "Sep 20, 2026",
    amount: "$3,200",
    status: "submitted",
  },
  {
    id: 2,
    reference: "CLM-2026-1042",
    client: "Fatema Begum",
    type: "Life Insurance",
    date: "Sep 18, 2026",
    amount: "$12,000",
    status: "under_review",
  },
  {
    id: 3,
    reference: "CLM-2026-1035",
    client: "Md. Rahman",
    type: "Auto Insurance",
    date: "Sep 10, 2026",
    amount: "$2,500",
    status: "approved",
  },
  {
    id: 4,
    reference: "CLM-2026-1022",
    client: "Nasrin Akhter",
    type: "Property Insurance",
    date: "Sep 2, 2026",
    amount: "$8,000",
    status: "rejected",
  },
];

export const adminInsuranceTypes: AdminInsuranceTypeSummary[] = [
  {
    id: 1,
    name: "Health Insurance",
    description: "Inpatient and outpatient medical coverage",
    status: "active",
    policies: 34,
  },
  {
    id: 2,
    name: "Life Insurance",
    description: "Whole life coverage for families",
    status: "active",
    policies: 21,
  },
  {
    id: 3,
    name: "Auto Insurance",
    description: "Vehicle and third-party liability cover",
    status: "active",
    policies: 15,
  },
  {
    id: 4,
    name: "Travel Insurance",
    description: "Coverage for trips and travel risks",
    status: "inactive",
    policies: 0,
  },
];