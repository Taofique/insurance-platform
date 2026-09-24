import {
  ChevronRight,
  ClipboardList,
  Clock,
  Download,
  DollarSign,
  FileText,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react";
import { Link } from "react-router";
import Button from "../../../components/ui/Button";
import SectionHeader from "../../../components/dashboard/SectionHeader";
import StatCard from "../../../components/dashboard/StatCard";
import StatusBadge from "../../../components/dashboard/StatusBadge";
import QuickActions from "../../../components/dashboard/QuickActions";
import {
  attentionTasks,
  performanceData,
  recentClaims,
  recentClients,
} from "../../data/agent-dashboard";

const priorityClasses: Record<string, string> = {
  high: "bg-red-50 text-red-600",
  medium: "bg-amber-50 text-amber-600",
  low: "bg-blue-50 text-blue-600",
};

export default function AgentDashboard() {
  const stats = [
    {
      label: "Total Clients",
      value: "45",
      icon: Users,
      iconClasses: "bg-blue-100 text-blue-600",
      change: "+12%",
    },
    {
      label: "Active Policies",
      value: "78",
      icon: FileText,
      iconClasses: "bg-green-100 text-green-600",
      change: "+8%",
    },
    {
      label: "Commission Earned",
      value: "$12,450",
      icon: DollarSign,
      iconClasses: "bg-purple-100 text-purple-600",
      change: "+15%",
    },
    {
      label: "Leads Generated",
      value: "12",
      icon: TrendingUp,
      iconClasses: "bg-orange-100 text-orange-600",
      change: "+5%",
    },
  ];

  const quickActions = [
    {
      label: "Add Client",
      description: "Enroll a new client",
      to: "/agent/clients/add",
      icon: UserPlus,
    },
    {
      label: "New Policy",
      description: "Issue a new policy",
      to: "/agent/policies/all",
      icon: FileText,
    },
    {
      label: "Review Claims",
      description: "Pending claim approvals",
      to: "/agent/claims/pending",
      icon: ClipboardList,
    },
    {
      label: "View Leads",
      description: "Recent lead activity",
      to: "/agent/leads/new",
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
            Overview of your clients, policies and performance.
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
              Welcome back, John!
            </h2>
            <p className="mt-1 font-poppins text-sm text-white/80">
              You have 3 pending tasks to review today.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="rounded-lg bg-white/15 px-4 py-3 text-center backdrop-blur-sm">
              <p className="font-poppins text-xs text-white/80">
                Today's Target
              </p>
              <p className="font-poppins font-semibold">$2,500</p>
            </div>
            <div className="rounded-lg bg-white/15 px-4 py-3 text-center backdrop-blur-sm">
              <p className="font-poppins text-xs text-white/80">Achieved</p>
              <p className="font-poppins font-semibold">$1,800</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Claims | Recent Clients */}
      <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <SectionHeader
            title="Recent Claims"
            subtitle="Latest claim submissions"
            actionLabel="View all"
            to="/agent/claims"
          />
          <ul className="divide-y divide-gray-100">
            {recentClaims.map((claim) => (
              <li
                key={claim.id}
                className="flex items-center gap-4 py-3.5 first:pt-0 last:pb-0"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate font-poppins text-sm font-semibold text-gray-900">
                    {claim.client}
                  </p>
                  <p className="truncate font-poppins text-xs text-gray-500">
                    {claim.policy} · {claim.date}
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
            title="Recent Clients"
            subtitle="Newest additions this month"
            actionLabel="View all"
            to="/agent/clients/list"
          />
          <ul className="divide-y divide-gray-100">
            {recentClients.map((client) => (
              <li
                key={client.id}
                className="flex items-center gap-4 py-3.5 first:pt-0 last:pb-0"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f7ece9] text-[#ac3e25]">
                  <Users size={18} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-poppins text-sm font-semibold text-gray-900">
                    {client.name}
                  </p>
                  <p className="truncate font-poppins text-xs text-gray-500">
                    {client.email} · {client.date}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="mb-1 truncate font-poppins text-xs text-gray-500">
                    {client.policy}
                  </p>
                  <StatusBadge status={client.status} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Performance | Needs attention */}
      <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
          <SectionHeader
            title="Performance Overview"
            subtitle="Key targets for this quarter"
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {performanceData.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-poppins text-sm text-gray-600">
                    {item.label}
                  </span>
                  <span className="font-poppins text-sm font-semibold text-gray-900">
                    {item.value}
                  </span>
                </div>
                <div className="mt-2 h-2.5 w-full rounded-full bg-gray-100">
                  <div
                    className="h-2.5 rounded-full bg-[#ac3e25] transition-all duration-500"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <SectionHeader
            title="Needs Attention"
            subtitle="Tasks pending your review"
          />
          <ul className="space-y-1">
            {attentionTasks.map((task) => (
              <li key={task.id}>
                <Link
                  to={task.to}
                  className="group flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-gray-50"
                >
                  <span
                    className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg ${priorityClasses[task.priority]}`}
                  >
                    <Clock size={15} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-poppins text-sm font-medium text-gray-900">
                      {task.label}
                    </span>
                    <span className="block font-poppins text-xs text-gray-500">
                      {task.meta}
                    </span>
                  </span>
                  <ChevronRight
                    size={16}
                    className="mt-1 shrink-0 text-gray-400 transition-colors group-hover:text-[#ac3e25]"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Quick actions */}
      <section className="mt-6">
        <SectionHeader
          title="Quick Actions"
          subtitle="Frequently used tools"
        />
        <QuickActions actions={quickActions} className="sm:grid-cols-2 xl:grid-cols-4" />
      </section>
    </div>
  );
}