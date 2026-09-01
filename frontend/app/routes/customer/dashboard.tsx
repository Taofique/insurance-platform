import { FileText, Users, ClipboardList, DollarSign } from "lucide-react";
import CustomerPortalLayout from "../../../layouts/CustomerPortalLayout";

export default function CustomerDashboard() {
  const stats = [
    {
      label: "Active Policies",
      value: "3",
      icon: FileText,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Claims Filed",
      value: "2",
      icon: ClipboardList,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      label: "Total Premium",
      value: "$12,450",
      icon: DollarSign,
      color: "bg-green-100 text-green-600",
    },
  ];

  return (
    <CustomerPortalLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-semibold text-gray-800">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-[#ac3e25] to-[#8a3220] rounded-xl p-8 text-white">
          <h2 className="text-2xl font-semibold mb-2">Welcome Back, Tarif!</h2>
          <p className="text-white/80">
            Your policies are all active and up to date.
          </p>
        </div>
      </div>
    </CustomerPortalLayout>
  );
}
