interface StatusBadgeProps {
  status: string;
}

const statusConfig: Record<
  string,
  { label: string; dot: string; badge: string }
> = {
  active: { label: "Active", dot: "bg-green-500", badge: "bg-green-50 text-green-700" },
  inactive: { label: "Inactive", dot: "bg-gray-400", badge: "bg-gray-100 text-gray-600" },
  submitted: { label: "Submitted", dot: "bg-blue-500", badge: "bg-blue-50 text-blue-700" },
  under_review: { label: "Under Review", dot: "bg-yellow-500", badge: "bg-yellow-50 text-yellow-700" },
  approved: { label: "Approved", dot: "bg-green-500", badge: "bg-green-50 text-green-700" },
  settled: { label: "Settled", dot: "bg-green-500", badge: "bg-green-50 text-green-700" },
  paid: { label: "Paid", dot: "bg-green-500", badge: "bg-green-50 text-green-700" },
  pending: { label: "Pending", dot: "bg-yellow-500", badge: "bg-yellow-50 text-yellow-700" },
  processing: { label: "Processing", dot: "bg-yellow-500", badge: "bg-yellow-50 text-yellow-700" },
  inreview: { label: "In Review", dot: "bg-yellow-500", badge: "bg-yellow-50 text-yellow-700" },
  due: { label: "Due", dot: "bg-orange-500", badge: "bg-orange-50 text-orange-700" },
  overdue: { label: "Overdue", dot: "bg-red-500", badge: "bg-red-50 text-red-700" },
  rejected: { label: "Rejected", dot: "bg-red-500", badge: "bg-red-50 text-red-700" },
  cancelled: { label: "Cancelled", dot: "bg-red-500", badge: "bg-red-50 text-red-700" },
  expired: { label: "Expired", dot: "bg-gray-400", badge: "bg-gray-100 text-gray-600" },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config =
    statusConfig[status.toLowerCase()] ?? {
      label: status,
      dot: "bg-gray-400",
      badge: "bg-gray-100 text-gray-600",
    };

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 font-poppins text-xs font-medium ${config.badge}`}
    >
      <span className={`size-1.5 rounded-full ${config.dot}`} aria-hidden="true" />
      {config.label}
    </span>
  );
}