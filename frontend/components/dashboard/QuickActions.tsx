import { Link } from "react-router";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

export interface QuickAction {
  label: string;
  description?: string;
  to: string;
  icon: LucideIcon;
}

interface QuickActionsProps {
  actions: QuickAction[];
  className?: string;
}

export default function QuickActions({
  actions,
  className = "sm:grid-cols-2",
}: QuickActionsProps) {
  return (
    <div className={`grid grid-cols-1 gap-3 ${className}`}>
      {actions.map(({ label, description, to, icon: Icon }) => (
        <Link
          key={to}
          to={to}
          className="group flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-200 hover:border-[#ac3e25]/30 hover:shadow-md"
        >
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#f7ece9] text-[#ac3e25]">
            <Icon size={20} />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-poppins text-sm font-semibold text-gray-900">
              {label}
            </span>
            {description && (
              <span className="block truncate font-poppins text-xs text-gray-500">
                {description}
              </span>
            )}
          </span>
          <ArrowUpRight
            size={16}
            className="ml-auto shrink-0 text-gray-400 transition-colors group-hover:text-[#ac3e25]"
          />
        </Link>
      ))}
    </div>
  );
}