import {
  User,
  Users,
  FileText,
  Settings,
  Briefcase,
  DollarSign,
  TrendingUp,
  UserCog,
  LayoutDashboard,
  ClipboardList,
  FileCheck,
} from "lucide-react";
import PortalLayout from "./PortalLayout";

const agentNavLinks = [
  {
    label: "Dashboard",
    to: "/agent/dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  {
    label: "My Clients",
    to: "/agent/clients",
    icon: <Users size={18} />,
    children: [
      {
        label: "Client List",
        to: "/agent/clients/list",
        icon: <Users size={16} />,
      },
      {
        label: "Add Client",
        to: "/agent/clients/add",
        icon: <UserCog size={16} />,
      },
    ],
  },
  {
    label: "Policy Management",
    to: "/agent/policies",
    icon: <FileText size={18} />,
    children: [
      {
        label: "All Policies",
        to: "/agent/policies/all",
        icon: <FileText size={16} />,
      },
      {
        label: "Active Policies",
        to: "/agent/policies/active",
        icon: <FileCheck size={16} />,
      },
      {
        label: "Expired Policies",
        to: "/agent/policies/expired",
        icon: <FileText size={16} />,
      },
    ],
  },
  {
    label: "Claims Section",
    to: "/agent/claims",
    icon: <ClipboardList size={18} />,
    children: [
      {
        label: "Pending Claims",
        to: "/agent/claims/pending",
        icon: <ClipboardList size={16} />,
      },
      {
        label: "Approved Claims",
        to: "/agent/claims/approved",
        icon: <FileCheck size={16} />,
      },
      {
        label: "Rejected Claims",
        to: "/agent/claims/rejected",
        icon: <FileText size={16} />,
      },
    ],
  },
  {
    label: "Commission & Earnings",
    to: "/agent/commission",
    icon: <DollarSign size={18} />,
    children: [
      {
        label: "Commission Report",
        to: "/agent/commission/report",
        icon: <TrendingUp size={16} />,
      },
      {
        label: "Payout History",
        to: "/agent/commission/history",
        icon: <DollarSign size={16} />,
      },
    ],
  },
  {
    label: "Leads Management",
    to: "/agent/leads",
    icon: <TrendingUp size={18} />,
    children: [
      {
        label: "New Leads",
        to: "/agent/leads/new",
        icon: <TrendingUp size={16} />,
      },
      {
        label: "Converted Leads",
        to: "/agent/leads/converted",
        icon: <UserCog size={16} />,
      },
    ],
  },
  {
    label: "Profile",
    to: "/agent/profile",
    icon: <User size={18} />,
    children: [
      {
        label: "Personal Info",
        to: "/agent/profile/info",
        icon: <User size={16} />,
      },
      {
        label: "Performance",
        to: "/agent/profile/performance",
        icon: <TrendingUp size={16} />,
      },
    ],
  },
  {
    label: "Settings",
    to: "/agent/settings",
    icon: <Settings size={18} />,
  },
];

export default function AgentPortalLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <PortalLayout
      portalType="agent"
      userName="John Doe"
      userRole="Agent"
      navLinks={agentNavLinks}
    >
      {children}
    </PortalLayout>
  );
}
