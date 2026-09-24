export interface AgentClaim {
  id: number;
  client: string;
  policy: string;
  amount: string;
  status: "pending" | "approved" | "rejected";
  date: string;
}

export interface AgentClient {
  id: number;
  name: string;
  email: string;
  policy: string;
  date: string;
  status: "active" | "pending";
}

export interface PerformanceMetric {
  label: string;
  value: string;
  progress: number;
}

export interface AttentionTask {
  id: number;
  label: string;
  meta: string;
  to: string;
  priority: "high" | "medium" | "low";
}

export const recentClaims: AgentClaim[] = [
  {
    id: 1,
    client: "Ahmed Hasan",
    policy: "Health Insurance",
    amount: "$5,000",
    status: "pending",
    date: "Sep 1, 2026",
  },
  {
    id: 2,
    client: "Fatema Begum",
    policy: "Life Insurance",
    amount: "$15,000",
    status: "approved",
    date: "Aug 30, 2026",
  },
  {
    id: 3,
    client: "Md. Rahman",
    policy: "Auto Insurance",
    amount: "$2,500",
    status: "approved",
    date: "Aug 28, 2026",
  },
  {
    id: 4,
    client: "Nasrin Akhter",
    policy: "Property Insurance",
    amount: "$8,000",
    status: "rejected",
    date: "Aug 25, 2026",
  },
];

export const recentClients: AgentClient[] = [
  {
    id: 1,
    name: "Tarif Al-Mozahed",
    email: "tarif@email.com",
    policy: "Health Insurance",
    date: "Sep 1, 2026",
    status: "active",
  },
  {
    id: 2,
    name: "Sadia Khan",
    email: "sadia@email.com",
    policy: "Life Insurance",
    date: "Aug 28, 2026",
    status: "active",
  },
  {
    id: 3,
    name: "Rafiqul Islam",
    email: "rafiq@email.com",
    policy: "Auto Insurance",
    date: "Aug 25, 2026",
    status: "pending",
  },
];

export const performanceData: PerformanceMetric[] = [
  { label: "Monthly Target", value: "$50,000", progress: 75 },
  { label: "Client Satisfaction", value: "94%", progress: 94 },
  { label: "Claim Settlement", value: "88%", progress: 88 },
];

export const attentionTasks: AttentionTask[] = [
  {
    id: 1,
    label: "Review pending claim CLM-2026-1042",
    meta: "Health Insurance · Pending review",
    to: "/agent/claims/pending",
    priority: "high",
  },
  {
    id: 2,
    label: "Follow up with Rafiqul Islam",
    meta: "Auto Insurance application",
    to: "/agent/clients/list",
    priority: "medium",
  },
  {
    id: 3,
    label: "Renewal reminder for Ahmed Hasan",
    meta: "Health Insurance · Due Oct 12",
    to: "/agent/policies/active",
    priority: "medium",
  },
  {
    id: 4,
    label: "3 new leads awaiting contact",
    meta: "Leads added this week",
    to: "/agent/leads/new",
    priority: "low",
  },
];