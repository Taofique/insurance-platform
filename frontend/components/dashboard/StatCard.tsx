import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  iconClasses?: string;
  change?: string;
}

export default function StatCard({
  label,
  value,
  icon: Icon,
  iconClasses = "bg-[#f7ece9] text-[#ac3e25]",
  change,
}: StatCardProps) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <span
          className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${iconClasses}`}
        >
          <Icon size={20} />
        </span>
        {change && (
          <span className="rounded-full bg-green-50 px-2 py-0.5 font-poppins text-xs font-medium text-green-600">
            {change}
          </span>
        )}
      </div>
      <p className="mt-4 font-poppins text-2xl font-semibold text-gray-900">
        {value}
      </p>
      <p className="mt-0.5 font-poppins text-sm text-gray-500">{label}</p>
    </div>
  );
}