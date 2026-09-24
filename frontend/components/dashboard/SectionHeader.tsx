import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  to?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  actionLabel,
  to,
}: SectionHeaderProps) {
  return (
    <div className="mb-4 flex items-start justify-between gap-4">
      <div className="min-w-0">
        <h2 className="font-poppins font-semibold text-gray-900">{title}</h2>
        {subtitle && (
          <p className="mt-0.5 font-poppins text-xs text-gray-500">
            {subtitle}
          </p>
        )}
      </div>
      {actionLabel && to && (
        <Link
          to={to}
          className="inline-flex shrink-0 items-center gap-1 font-poppins text-sm font-medium text-[#ac3e25] transition-colors hover:text-[#8a3220]"
        >
          {actionLabel}
          <ArrowUpRight size={14} />
        </Link>
      )}
    </div>
  );
}