import {
  LayoutDashboard,
  ClipboardList,
  FileCheck,
  FileText,
  ShieldCheck,
  User,
  Settings,
  TrendingUp,
} from "lucide-react";
import { useAuth } from "../app/context/AuthContext";
import { ROLE_LABEL } from "../app/roles";
import RoleGuard from "../components/auth/RoleGuard";
import PortalLayout from "./PortalLayout";

const claimsOfficerNavLinks = [
  {
    label: "Dashboard",
    to: "/claims-officer/dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  {
    label: "Claims",
    to: "/claims-officer/claims",
    icon: <ClipboardList size={18} />,
    children: [
      {
        label: "Submitted Claims",
        to: "/claims-officer/claims/submitted",
        icon: <FileCheck size={16} />,
      },
      {
        label: "Under Review",
        to: "/claims-officer/claims/under-review",
        icon: <ClipboardList size={16} />,
      },
      {
        label: "Approved Claims",
        to: "/claims-officer/claims/approved",
        icon: <FileCheck size={16} />,
      },
      {
        label: "Rejected Claims",
        to: "/claims-officer/claims/rejected",
        icon: <FileText size={16} />,
      },
    ],
  },
  {
    label: "Policies",
    to: "/claims-officer/policies",
    icon: <FileText size={18} />,
    children: [
      {
        label: "All Policies",
        to: "/claims-officer/policies",
        icon: <FileText size={16} />,
      },
      {
        label: "Active Policies",
        to: "/claims-officer/policies/active",
        icon: <FileCheck size={16} />,
      },
    ],
  },
  {
    label: "Insurance Types",
    to: "/claims-officer/insurance-types",
    icon: <ShieldCheck size={18} />,
  },
  {
    label: "Reports",
    to: "/claims-officer/reports",
    icon: <TrendingUp size={18} />,
  },
  {
    label: "Profile",
    to: "/claims-officer/profile",
    icon: <User size={18} />,
  },
  {
    label: "Settings",
    to: "/claims-officer/settings",
    icon: <Settings size={18} />,
  },
];

export default function ClaimsOfficerPortalLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { user } = useAuth();

  return (
    <RoleGuard allowedRoles={["claims_officer"]}>
      <PortalLayout
        portalTitle="Claims Officer Portal"
        userName={user?.name ?? ""}
        userRole={user ? ROLE_LABEL[user.role] : "Claims Officer"}
        navLinks={claimsOfficerNavLinks}
      >
        {children}
      </PortalLayout>
    </RoleGuard>
  );
}