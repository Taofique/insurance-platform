export interface CustomerPolicySummary {
  id: string;
  name: string;
  type: string;
  premium: string;
  status: "active" | "pending" | "expired";
  expires: string;
}

export interface CustomerClaimSummary {
  id: string;
  reference: string;
  type: string;
  date: string;
  amount: string;
  status: "pending" | "processing" | "approved" | "settled" | "rejected";
}

export interface PremiumPayment {
  id: string;
  policy: string;
  amount: string;
  dueDate: string;
  status: "paid" | "due" | "overdue";
}

export const customerPolicies: CustomerPolicySummary[] = [
  {
    id: "pol-1",
    name: "Health Shield Pro",
    type: "Health Insurance",
    premium: "$120",
    status: "active",
    expires: "Dec 12, 2027",
  },
  {
    id: "pol-2",
    name: "Family Life Plus",
    type: "Life Insurance",
    premium: "$240",
    status: "active",
    expires: "Jun 30, 2040",
  },
  {
    id: "pol-3",
    name: "Car Guardian",
    type: "Auto Insurance",
    premium: "$85",
    status: "active",
    expires: "Mar 15, 2027",
  },
  {
    id: "pol-4",
    name: "Home Shield",
    type: "Property Insurance",
    premium: "$180",
    status: "active",
    expires: "Sep 05, 2027",
  },
];

export const customerClaims: CustomerClaimSummary[] = [
  {
    id: "clm-1",
    reference: "CLM-2026-1042",
    type: "Dental Treatment",
    date: "Sep 18, 2026",
    amount: "$850",
    status: "pending",
  },
  {
    id: "clm-2",
    reference: "CLM-2026-1031",
    type: "Inpatient Hospitalization",
    date: "Aug 02, 2026",
    amount: "$4,200",
    status: "approved",
  },
  {
    id: "clm-3",
    reference: "CLM-2026-1008",
    type: "Outpatient Consultation",
    date: "Jun 14, 2026",
    amount: "$120",
    status: "settled",
  },
  {
    id: "clm-4",
    reference: "CLM-2026-0995",
    type: "Dental Treatment",
    date: "Apr 30, 2026",
    amount: "$1,150",
    status: "settled",
  },
];

export const customerPremiumPayments: PremiumPayment[] = [
  {
    id: "pay-1",
    policy: "Health Shield Pro",
    amount: "$120",
    dueDate: "Oct 1, 2026",
    status: "paid",
  },
  {
    id: "pay-2",
    policy: "Car Guardian",
    amount: "$85",
    dueDate: "Oct 15, 2026",
    status: "due",
  },
  {
    id: "pay-3",
    policy: "Family Life Plus",
    amount: "$240",
    dueDate: "Nov 30, 2026",
    status: "due",
  },
  {
    id: "pay-4",
    policy: "Home Shield",
    amount: "$180",
    dueDate: "Dec 5, 2026",
    status: "paid",
  },
];