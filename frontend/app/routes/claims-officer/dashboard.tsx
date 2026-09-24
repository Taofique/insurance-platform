import {
  Clock,
  Download,
  FileCheck,
  FilePlus,
  TrendingUp,
} from "lucide-react";
import Button from "../../../components/ui/Button";
import SectionHeader from "../../../components/dashboard/SectionHeader";
import StatCard from "../../../components/dashboard/StatCard";
import StatusBadge from "../../../components/dashboard/StatusBadge";
import QuickActions from "../../../components/dashboard/QuickActions";
import { useAuth } from "../../context/AuthContext";
import {
  claimsPipeline,
  claimsRecentlyProcessed,
  claimsRequiringReview,
} from "../../data/claims-officer-dashboard";

export default function ClaimsOfficerDashboard() {
  const { user } = useAuth();

  const stats = [
    {
      label: "Submitted",
      value: "3",
      icon: FilePlus,
      iconClasses: "bg-blue-100 text-blue-600",
      change: "+1",
    },
    {
      label: "Under Review",
      value: "2",
      icon: Clock,
      iconClasses: "bg-yellow-100 text-yellow-600",
      change: "Active",
    },
    {
      label: "Approved",
      value: "5",
      icon: FileCheck,
      iconClasses: "bg-green-100 text-green-600",
      change: "+2",
    },
    {
      label: "Paid",
      value: "7",
      icon: FileCheck,
      iconClasses: "bg-purple-100 text-purple-600",
      change: "+3",
    },
  ];

  const quickActions = [
    {
      label: "Review Submitted",
      description: "Claims waiting for review",
      to: "/claims-officer/claims/submitted",
      icon: FilePlus,
    },
    {
      label: "Process Under Review",
      description: "Continue active decisions",
      to: "/claims-officer/claims/under-review",
      icon: Clock,
    },
    {
      label: "View Approved",
      description: "Approved payout list",
      to: "/claims-officer/claims/approved",
      icon: FileCheck,
    },
    {
      label: "Claim Report",
      description: "Generate claim analytics",
      to: "/claims-officer/reports",
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
            Review and manage claim submissions across the platform.
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
            Export Report
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
              You have 3 submitted claims waiting for your review.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="rounded-lg bg-white/15 px-4 py-3 text-center backdrop-blur-sm">
              <p className="font-poppins text-xs text-white/80">
                Avg. Processing
              </p>
              <p className="font-poppins font-semibold">4 days</p>
            </div>
            <div className="rounded-lg bg-white/15 px-4 py-3 text-center backdrop-blur-sm">
              <p className="font-poppins text-xs text-white/80">Workload</p>
              <p className="font-poppins font-semibold">3 open</p>
            </div>
          </div>
        </div>
      </section>

      {/* Requiring review | Recently processed */}
      <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <SectionHeader
            title="Claims Requiring Review"
            subtitle="Submitted and under review"
            actionLabel="Review"
            to="/claims-officer/claims/submitted"
          />
          <ul className="divide-y divide-gray-100">
            {claimsRequiringReview.map((claim) => (
              <li
                key={claim.id}
                className="flex items-center gap-4 py-3.5 first:pt-0 last:pb-0"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate font-poppins text-sm font-semibold text-gray-900">
                    {claim.client}
                  </p>
                  <p className="truncate font-poppins text-xs text-gray-500">
                    {claim.reference} · {claim.policy} · {claim.date}
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

        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <SectionHeader
            title="Recently Processed"
            subtitle="Approved, paid and rejected claims"
            actionLabel="View history"
            to="/claims-officer/claims"
          />
          <ul className="divide-y divide-gray-100">
            {claimsRecentlyProcessed.map((claim) => (
              <li
                key={claim.id}
                className="flex items-center gap-4 py-3.5 first:pt-0 last:pb-0"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate font-poppins text-sm font-semibold text-gray-900">
                    {claim.client}
                  </p>
                  <p className="truncate font-poppins text-xs text-gray-500">
                    {claim.reference} · {claim.policy} · {claim.date}
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

      {/* Pipeline | Quick actions */}
      <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <SectionHeader
            title="Claims Pipeline"
            subtitle="Current volume by status"
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {claimsPipeline.map((step) => (
              <div
                key={step.status}
                className="rounded-lg border border-gray-100 bg-gray-50 p-4 text-center"
              >
                <p className="font-poppins text-2xl font-semibold text-gray-900">
                  {step.count}
                </p>
                <div className="mt-2 flex justify-center">
                  <StatusBadge status={step.status} />
                </div>
              </div>
            ))}
          </div>
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