import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../../app/context/AuthContext";
import { getDashboardPath } from "../../app/roles";
import type { UserRole } from "../../app/types/auth";

interface RoleGuardProps {
  allowedRoles: UserRole[];
  children: ReactNode;
}

export default function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div role="status" className="flex flex-col items-center gap-3">
          <span
            className="size-8 animate-spin rounded-full border-2 border-[#ac3e25]/20 border-t-[#ac3e25]"
            aria-hidden="true"
          />
          <p className="font-poppins text-sm text-gray-500">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={getDashboardPath(user.role)} replace />;
  }

  return <>{children}</>;
}