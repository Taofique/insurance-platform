import {
  LayoutDashboard,
  Users,
  UserPlus,
  ShieldCheck,
  FileCheck,
  FileText,
  ClipboardList,
  TrendingUp,
  Settings,
  DollarSign,
} from "lucide-react";
import { useAuth } from "../app/context/AuthContext";
import { ROLE_LABEL } from "../app/roles";
import RoleGuard from "../components/auth/RoleGuard";
import PortalLayout from "./PortalLayout";

const adminNavLinks = [
  {
    label: "Dashboard",
    to: "/admin/dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  {
    label: "Users",
    to: "/admin/users",
    icon: <Users size={18} />,
    children: [
      {
        label: "All Users",
        to: "/admin/users",
        icon: <Users size={16} />,
      },
      {
        label: "Add User",
        to: "/admin/users/new",
        icon: <UserPlus size={16} />,
      },
    ],
  },
  {
    label: "Insurance Types",
    to: "/admin/insurance-types",
    icon: <ShieldCheck size={18} />,
    children: [
      {
        label: "All Types",
        to: "/admin/insurance-types",
        icon: <ShieldCheck size={16} />,
      },
      {
        label: "Add Type",
        to: "/admin/insurance-types/new",
        icon: <FileCheck size={16} />,
      },
    ],
  },
  {
    label: "Policies",
    to: "/admin/policies",
    icon: <FileText size={18} />,
    children: [
      {
        label: "All Policies",
        to: "/admin/policies",
        icon: <FileText size={16} />,
      },
      {
        label: "Active Policies",
        to: "/admin/policies/active",
        icon: <FileCheck size={16} />,
      },
      {
        label: "Expired Policies",
        to: "/admin/policies/expired",
        icon: <FileText size={16} />,
      },
    ],
  },
  {
    label: "Claims",
    to: "/admin/claims",
    icon: <ClipboardList size={18} />,
    children: [
      {
        label: "All Claims",
        to: "/admin/claims",
        icon: <ClipboardList size={16} />,
      },
      {
        label: "Pending Claims",
        to: "/admin/claims/pending",
        icon: <FileCheck size={16} />,
      },
      {
        label: "Rejected Claims",
        to: "/admin/claims/rejected",
        icon: <FileText size={16} />,
      },
    ],
  },
  {
    label: "Reports",
    to: "/admin/reports",
    icon: <TrendingUp size={18} />,
  },
  {
    label: "Settings",
    to: "/admin/settings",
    icon: <Settings size={18} />,
  },
];

export default function AdminPortalLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { user } = useAuth();

  return (
    <RoleGuard allowedRoles={["admin"]}>
      <PortalLayout
        portalTitle="Admin Portal"
        userName={user?.name ?? ""}
        userRole={user ? ROLE_LABEL[user.role] : "Administrator"}
        navLinks={adminNavLinks}
      >
        {children}
      </PortalLayout>
    </RoleGuard>
  );
}