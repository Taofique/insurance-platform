import {
  ClipboardList,
  CreditCard,
  DollarSign,
  FileCheck,
  FileText,
  ShieldCheck,
} from "lucide-react";
import SectionHeader from "../../../components/dashboard/SectionHeader";
import StatCard from "../../../components/dashboard/StatCard";
import StatusBadge from "../../../components/dashboard/StatusBadge";
import QuickActions from "../../../components/dashboard/QuickActions";
import {
  customerClaims,
  customerPolicies,
  customerPremiumPayments,
} from "../../data/customer-dashboard";
import { useAuth } from "../../context/AuthContext";

export default function CustomerDashboard() {
  const { user } = useAuth();
  const stats = [
    {
      label: "Active Policies",
      value: "4",
      icon: FileText,
      iconClasses: "bg-blue-100 text-blue-600",
    },
    {
      label: "Open Claims",
      value: "1",
      icon: ClipboardList,
      iconClasses: "bg-yellow-100 text-yellow-600",
    },
    {
      label: "Premium Paid",
      value: "$12,450",
      icon: DollarSign,
      iconClasses: "bg-green-100 text-green-600",
    },
    {
      label: "Total Coverage",
      value: "$500,000",
      icon: ShieldCheck,
      iconClasses: "bg-purple-100 text-purple-600",
    },
  ];

  const quickActions = [
    {
      label: "View Policies",
      description: "Manage your active plans",
      to: "/customer/policies",
      icon: FileText,
    },
    {
      label: "File a Claim",
      description: "Start a new claim request",
      to: "/customer/claims/file",
      icon: FileCheck,
    },
    {
      label: "Track Claim",
      description: "Check claim progress",
      to: "/customer/claims/track",
      icon: ClipboardList,
    },
    {
      label: "Pay Premium",
      description: "View upcoming payments",
      to: "/customer/policies",
      icon: CreditCard,
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
            Your policies, claims and payments at a glance.
          </p>
        </div>
        <span className="rounded-full bg-white px-3 py-1.5 font-poppins text-xs text-gray-500 shadow-sm">
          Updated today, 9:30 AM
        </span>
      </div>

      {/* Welcome banner */}
      <section className="overflow-hidden rounded-xl bg-gradient-to-r from-[#ac3e25] to-[#8a3220] p-6 text-white sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="font-poppins text-xl font-semibold sm:text-2xl">
              Welcome back{user?.name ? `, ${user.name}` : ""}!
            </h2>
            <p className="mt-1 max-w-xl font-poppins text-sm text-white/80">
              You're fully covered. All your policies are active, and your next
              premium payment is due soon.
            </p>
          </div>
          <div className="rounded-lg bg-white/15 px-4 py-3 text-center backdrop-blur-sm">
            <p className="font-poppins text-xs text-white/80">
              Next Premium Due
            </p>
            <p className="font-poppins text-lg font-semibold">
              Oct 15, 2026 · $85
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            iconClasses={stat.iconClasses}
          />
        ))}
      </section>

      {/* Recent policies | Recent claims */}
      <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <SectionHeader
            title="Recent Policies"
            subtitle="Your latest insurance plans"
            actionLabel="View all"
            to="/customer/policies"
          />
          <ul className="divide-y divide-gray-100">
            {customerPolicies.map((policy) => (
              <li
                key={policy.id}
                className="flex items-center gap-4 py-3.5 first:pt-0 last:pb-0"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#f7ece9] text-[#ac3e25]">
                  <FileText size={18} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-poppins text-sm font-semibold text-gray-900">
                    {policy.name}
                  </p>
                  <p className="truncate font-poppins text-xs text-gray-500">
                    {policy.type} · {policy.premium}/mo
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <StatusBadge status={policy.status} />
                  <p className="mt-1 font-poppins text-xs text-gray-400">
                    Expires {policy.expires}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <SectionHeader
            title="Recent Claims"
            subtitle="Latest claim activity"
            actionLabel="View all"
            to="/customer/claims/history"
          />
          <ul className="divide-y divide-gray-100">
            {customerClaims.map((claim) => (
              <li
                key={claim.id}
                className="flex items-center gap-4 py-3.5 first:pt-0 last:pb-0"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#f7ece9] text-[#ac3e25]">
                  <ClipboardList size={18} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-poppins text-sm font-semibold text-gray-900">
                    {claim.reference}
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

      {/* Upcoming payments | Quick actions */}
      <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <SectionHeader
            title="Upcoming Payments"
            subtitle="Your premium schedule"
            actionLabel="Pay now"
            to="/customer/policies"
          />
          <ul className="divide-y divide-gray-100">
            {customerPremiumPayments.map((payment) => (
              <li
                key={payment.id}
                className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0"
              >
                <div className="min-w-0">
                  <p className="truncate font-poppins text-sm font-medium text-gray-900">
                    {payment.policy}
                  </p>
                  <p className="font-poppins text-xs text-gray-500">
                    Due {payment.dueDate}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="font-poppins text-sm font-semibold text-gray-900">
                    {payment.amount}
                  </span>
                  <StatusBadge status={payment.status} />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <SectionHeader
            title="Quick Actions"
            subtitle="Jump straight to what you need"
          />
          <QuickActions actions={quickActions} className="sm:grid-cols-2" />
        </div>
      </section>
    </div>
  );
}