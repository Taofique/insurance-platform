import {
  ClipboardList,
  Download,
  FileText,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import Button from "../../../components/ui/Button";
import SectionHeader from "../../../components/dashboard/SectionHeader";
import StatCard from "../../../components/dashboard/StatCard";
import StatusBadge from "../../../components/dashboard/StatusBadge";
import QuickActions from "../../../components/dashboard/QuickActions";
import { ROLE_LABEL } from "../../roles";
import { useAuth } from "../../context/AuthContext";
import {
  adminInsuranceTypes,
  adminRecentClaims,
  adminRecentUsers,
} from "../../data/admin-dashboard";

export default function AdminDashboard() {
  const { user } = useAuth();

  const stats = [
    {
      label: "Total Users",
      value: "120",
      icon: Users,
      iconClasses: "bg-blue-100 text-blue-600",
      change: "+6%",
    },
    {
      label: "Insurance Types",
      value: "8",
      icon: ShieldCheck,
      iconClasses: "bg-purple-100 text-purple-600",
      change: "+2",
    },
    {
      label: "Active Policies",
      value: "78",
      icon: FileText,
      iconClasses: "bg-green-100 text-green-600",
      change: "+8%",
    },
    {
      label: "Claims Filed",
      value: "34",
      icon: ClipboardList,
      iconClasses: "bg-orange-100 text-orange-600",
      change: "+11%",
    },
  ];

  const quickActions = [
    {
      label: "Manage Users",
      description: "View and manage accounts",
      to: "/admin/users",
      icon: Users,
    },
    {
      label: "Review Claims",
      description: "Monitor claim activity",
      to: "/admin/claims",
      icon: ClipboardList,
    },
    {
      label: "View Policies",
      description: "Browse all policies",
      to: "/admin/policies",
      icon: FileText,
    },
    {
      label: "Generate Reports",
      description: "Platform-wide analytics",
      to: "/admin/reports",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl">
      {/* Page header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-poppins text-2xl font-semibold text-gray-900">
            Dashboard
          </h1>
          <p className="mt-1 font-poppins text-sm text-gray-500">
            Platform overview of users, insurance types, policies and claims.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden font-poppins text-sm text-gray-500 sm:block">
            Last updated: Today, 2:30 PM
          </span>
          <Button
            variant="primary"
            size="sm"
            icon={<Download size={16} />}
            iconPosition="left"
            onClick={() => {
              /* Handle report generation */
            }}
          >
            Generate Report
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            iconClasses={stat.iconClasses}
            change={stat.change}
          />
        ))}
      </section>

      {/* Welcome Card */}
      <section className="mt-6 overflow-hidden rounded-xl bg-gradient-to-r from-[#ac3e25] to-[#8a3220] p-6 text-white sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="font-poppins text-xl font-semibold sm:text-2xl">
              Welcome back{user?.name ? `, ${user.name}` : ""}!
            </h2>
            <p className="mt-1 font-poppins text-sm text-white/80">
              Here is what is happening across the platform today.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="rounded-lg bg-white/15 px-4 py-3 text-center backdrop-blur-sm">
              <p className="font-poppins text-xs text-white/80">New Users</p>
              <p className="font-poppins font-semibold">This Week</p>
            </div>
            <div className="rounded-lg bg-white/15 px-4 py-3 text-center backdrop-blur-sm">
              <p className="font-poppins text-xs text-white/80">New Policies</p>
              <p className="font-poppins font-semibold">This Month</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Users | Recent Claims */}
      <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <SectionHeader
            title="Recent Users"
            subtitle="Newest accounts created"
            actionLabel="View all"
            to="/admin/users"
          />
          <ul className="divide-y divide-gray-100">
            {adminRecentUsers.map((entry) => (
              <li
                key={entry.id}
                className="flex items-center gap-4 py-3.5 first:pt-0 last:pb-0"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f7ece9] text-[#ac3e25]">
                  <Users size={18} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-poppins text-sm font-semibold text-gray-900">
                    {entry.name}
                  </p>
                  <p className="truncate font-poppins text-xs text-gray-500">
                    {entry.email}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="mb-1 truncate font-poppins text-xs text-gray-500">
                    {ROLE_LABEL[entry.role]} · {entry.date}
                  </p>
                  <StatusBadge status={entry.status} />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <SectionHeader
            title="Recent Claims"
            subtitle="Latest claim submissions"
            actionLabel="View all"
            to="/admin/claims"
          />
          <ul className="divide-y divide-gray-100">
            {adminRecentClaims.map((claim) => (
              <li
                key={claim.id}
                className="flex items-center gap-4 py-3.5 first:pt-0 last:pb-0"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate font-poppins text-sm font-semibold text-gray-900">
                    {claim.client}
                  </p>
                  <p className="truncate font-poppins text-xs text-gray-500">
                    {claim.type} · {claim.date}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-poppins text-sm font-semibold text-gray-900">
                    {claim.amount}
                  </p>
                  <StatusBadge status={claim.status} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Insurance Types | Quick actions */}
      <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <SectionHeader
            title="Insurance Types"
            subtitle="Available coverage categories"
            actionLabel="Manage"
            to="/admin/insurance-types"
          />
          <ul className="divide-y divide-gray-100">
            {adminInsuranceTypes.map((type) => (
              <li
                key={type.id}
                className="flex items-center gap-4 py-3.5 first:pt-0 last:pb-0"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f7ece9] text-[#ac3e25]">
                  <ShieldCheck size={18} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-poppins text-sm font-semibold text-gray-900">
                    {type.name}
                  </p>
                  <p className="truncate font-poppins text-xs text-gray-500">
                    {type.description}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="mb-1 font-poppins text-xs text-gray-500">
                    {type.policies} policies
                  </p>
                  <StatusBadge status={type.status} />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <SectionHeader
            title="Quick Actions"
            subtitle="Frequently used tools"
          />
          <QuickActions
            actions={quickActions}
            className="sm:grid-cols-2"
          />
        </div>
      </section>
    </div>
  );
}