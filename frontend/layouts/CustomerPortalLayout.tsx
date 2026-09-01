import {
  User,
  Users,
  FileText,
  Settings,
  ClipboardList,
  FileCheck,
  DollarSign,
  LayoutDashboard,
} from "lucide-react";
import PortalLayout from "./PortalLayout";

const customerNavLinks = [
  {
    label: "Dashboard",
    to: "/customer/dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  {
    label: "My Policies",
    to: "/customer/policies",
    icon: <FileText size={18} />,
    children: [
      {
        label: "Active Policies",
        to: "/customer/policies/active",
        icon: <FileCheck size={16} />,
      },
      {
        label: "Claim History",
        to: "/customer/policies/claims",
        icon: <ClipboardList size={16} />,
      },
    ],
  },
  {
    label: "My Claims",
    to: "/customer/claims",
    icon: <ClipboardList size={18} />,
    children: [
      {
        label: "File a Claim",
        to: "/customer/claims/file",
        icon: <FileCheck size={16} />,
      },
      {
        label: "Track Claim",
        to: "/customer/claims/track",
        icon: <ClipboardList size={16} />,
      },
      {
        label: "Claim History",
        to: "/customer/claims/history",
        icon: <FileText size={16} />,
      },
    ],
  },
  {
    label: "My Orders",
    to: "/customer/orders",
    icon: <Users size={18} />,
  },
  {
    label: "Profile",
    to: "/customer/profile",
    icon: <User size={18} />,
    children: [
      {
        label: "Personal Info",
        to: "/customer/profile/info",
        icon: <User size={16} />,
      },
      {
        label: "Security",
        to: "/customer/profile/security",
        icon: <Settings size={16} />,
      },
    ],
  },
  {
    label: "Settings",
    to: "/customer/settings",
    icon: <Settings size={18} />,
  },
];

export default function CustomerPortalLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <PortalLayout
      portalType="customer"
      userName="Taofique Islam"
      userRole="Customer"
      navLinks={customerNavLinks}
    >
      {children}
    </PortalLayout>
  );
}
