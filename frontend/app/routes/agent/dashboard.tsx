import {
  FileText,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  UserCheck,
} from "lucide-react";
import AgentPortalLayout from "../../../layouts/AgentPortalLayout";

export default function AgentDashboard() {
  // Mock data - replace with real data later
  const stats = [
    {
      label: "Total Clients",
      value: "45",
      icon: Users,
      color: "bg-blue-100 text-blue-600",
      change: "+12%",
    },
    {
      label: "Active Policies",
      value: "78",
      icon: FileText,
      color: "bg-green-100 text-green-600",
      change: "+8%",
    },
    {
      label: "Commission Earned",
      value: "$12,450",
      icon: DollarSign,
      color: "bg-purple-100 text-purple-600",
      change: "+15%",
    },
    {
      label: "Leads Generated",
      value: "12",
      icon: TrendingUp,
      color: "bg-orange-100 text-orange-600",
      change: "+5%",
    },
  ];

  const recentClaims = [
    {
      id: 1,
      client: "Ahmed Hasan",
      policy: "Health Insurance",
      amount: "$5,000",
      status: "Pending",
      date: "Sep 1, 2026",
    },
    {
      id: 2,
      client: "Fatema Begum",
      policy: "Life Insurance",
      amount: "$15,000",
      status: "Approved",
      date: "Aug 30, 2026",
    },
    {
      id: 3,
      client: "Md. Rahman",
      policy: "Auto Insurance",
      amount: "$2,500",
      status: "Approved",
      date: "Aug 28, 2026",
    },
    {
      id: 4,
      client: "Nasrin Akhter",
      policy: "Property Insurance",
      amount: "$8,000",
      status: "Rejected",
      date: "Aug 25, 2026",
    },
  ];

  const recentClients = [
    {
      id: 1,
      name: "Tarif Al-Mozahed",
      email: "tarif@email.com",
      policy: "Health Insurance",
      date: "Sep 1, 2026",
      status: "Active",
    },
    {
      id: 2,
      name: "Sadia Khan",
      email: "sadia@email.com",
      policy: "Life Insurance",
      date: "Aug 28, 2026",
      status: "Active",
    },
    {
      id: 3,
      name: "Rafiqul Islam",
      email: "rafiq@email.com",
      policy: "Auto Insurance",
      date: "Aug 25, 2026",
      status: "Pending",
    },
  ];

  const performanceData = [
    { label: "Monthly Target", value: "$50,000", progress: 75 },
    { label: "Client Satisfaction", value: "94%", progress: 94 },
    { label: "Claim Settlement", value: "88%", progress: 88 },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-600";
      case "approved":
        return "bg-green-100 text-green-600";
      case "rejected":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return <Clock size={14} className="text-yellow-600" />;
      case "approved":
        return <CheckCircle size={14} className="text-green-600" />;
      case "rejected":
        return <AlertCircle size={14} className="text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <AgentPortalLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">
              Last updated: Today, 2:30 PM
            </span>
            <button className="px-4 py-2 bg-[#ac3e25] text-white rounded-lg text-sm font-medium hover:bg-[#8a3220] transition-colors">
              Generate Report
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <span className="text-sm font-medium text-green-600">
                  {stat.change}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-800 mt-1">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-[#ac3e25] to-[#8a3220] rounded-xl p-6 text-white mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-semibold mb-1">
                Welcome Back, John!
              </h2>
              <p className="text-white/80">
                You have 3 pending tasks to review today.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="bg-white/20 rounded-lg px-4 py-2 text-center">
                <p className="text-xs text-white/80">Today's Target</p>
                <p className="font-semibold">$2,500</p>
              </div>
              <div className="bg-white/20 rounded-lg px-4 py-2 text-center">
                <p className="text-xs text-white/80">Achieved</p>
                <p className="font-semibold">$1,800</p>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Claims */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Recent Claims</h3>
              <button className="text-sm text-[#ac3e25] hover:underline">
                View All
              </button>
            </div>
            <div className="space-y-3">
              {recentClaims.map((claim) => (
                <div
                  key={claim.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm text-gray-800">
                        {claim.client}
                      </p>
                      {getStatusIcon(claim.status)}
                    </div>
                    <p className="text-xs text-gray-500">
                      {claim.policy} • {claim.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-800">
                      {claim.amount}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getStatusColor(claim.status)}`}
                    >
                      {claim.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Clients */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Recent Clients</h3>
              <button className="text-sm text-[#ac3e25] hover:underline">
                View All
              </button>
            </div>
            <div className="space-y-3">
              {recentClients.map((client) => (
                <div
                  key={client.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#f7ece9] flex items-center justify-center">
                      <UserCheck size={18} className="text-[#ac3e25]" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-800">
                        {client.name}
                      </p>
                      <p className="text-xs text-gray-500">{client.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{client.policy}</p>
                    <span
                      className={`text-xs ${client.status === "Active" ? "text-green-600" : "text-yellow-600"}`}
                    >
                      {client.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-semibold text-gray-800 mb-4">
            Performance Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {performanceData.map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{item.label}</span>
                  <span className="text-sm font-semibold text-gray-800">
                    {item.value}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-[#ac3e25] h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AgentPortalLayout>
  );
}
