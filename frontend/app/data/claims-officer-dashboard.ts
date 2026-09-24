export type ClaimsOfficerClaimStatus =
  | "submitted"
  | "under_review"
  | "approved"
  | "rejected"
  | "paid";

export interface ClaimsOfficerClaim {
  id: number;
  reference: string;
  client: string;
  policy: string;
  date: string;
  amount: string;
  status: ClaimsOfficerClaimStatus;
}

export interface ClaimsPipelineStep {
  status: ClaimsOfficerClaimStatus;
  label: string;
  count: number;
}

export const claimsRequiringReview: ClaimsOfficerClaim[] = [
  {
    id: 1,
    reference: "CLM-2026-1045",
    client: "Ahmed Hasan",
    policy: "Health Insurance",
    date: "Sep 20, 2026",
    amount: "$3,200",
    status: "submitted",
  },
  {
    id: 2,
    reference: "CLM-2026-1044",
    client: "Sadia Khan",
    policy: "Life Insurance",
    date: "Sep 19, 2026",
    amount: "$25,000",
    status: "submitted",
  },
  {
    id: 3,
    reference: "CLM-2026-1043",
    client: "Rafiqul Islam",
    policy: "Auto Insurance",
    date: "Sep 18, 2026",
    amount: "$1,800",
    status: "submitted",
  },
  {
    id: 4,
    reference: "CLM-2026-1042",
    client: "Fatema Begum",
    policy: "Life Insurance",
    date: "Sep 17, 2026",
    amount: "$12,000",
    status: "under_review",
  },
  {
    id: 5,
    reference: "CLM-2026-1040",
    client: "Nasrin Akhter",
    policy: "Property Insurance",
    date: "Sep 15, 2026",
    amount: "$8,000",
    status: "under_review",
  },
];

export const claimsRecentlyProcessed: ClaimsOfficerClaim[] = [
  {
    id: 6,
    reference: "CLM-2026-1035",
    client: "Md. Rahman",
    policy: "Auto Insurance",
    date: "Sep 10, 2026",
    amount: "$2,500",
    status: "approved",
  },
  {
    id: 7,
    reference: "CLM-2026-1031",
    client: "Sadia Khan",
    policy: "Health Insurance",
    date: "Sep 8, 2026",
    amount: "$1,100",
    status: "paid",
  },
  {
    id: 8,
    reference: "CLM-2026-1022",
    client: "Nasrin Akhter",
    policy: "Property Insurance",
    date: "Sep 2, 2026",
    amount: "$8,000",
    status: "rejected",
  },
];

export const claimsPipeline: ClaimsPipelineStep[] = [
  { status: "submitted", label: "Submitted", count: 3 },
  { status: "under_review", label: "Under Review", count: 2 },
  { status: "approved", label: "Approved", count: 5 },
  { status: "paid", label: "Paid", count: 7 },
];