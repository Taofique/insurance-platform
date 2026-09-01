import { Link, NavLink, useLocation } from "react-router";
import { User, LogOut, ChevronRight } from "lucide-react";
import { useState } from "react";
import Container from "../components/shared/Container";

export interface PortalLink {
  label: string;
  to: string;
  icon: React.ReactNode;
  children?: PortalLink[];
}

export interface PortalLayoutProps {
  portalType: "customer" | "agent";
  userName: string;
  userRole: string;
  userImage?: string;
  navLinks: PortalLink[];
  children?: React.ReactNode;
}

export default function PortalLayout({
  portalType,
  userName,
  userRole,
  userImage,
  navLinks,
  children,
}: PortalLayoutProps) {
  const location = useLocation();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const toggleMenu = (label: string) => {
    setExpandedMenus((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label],
    );
  };

  const isActiveRoute = (path: string) => {
    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 lg:hidden">
        <Container>
          <div className="flex items-center justify-between py-3">
            <button
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="rounded-lg p-2 hover:bg-gray-100"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h2 className="font-poppins font-semibold text-[#ac3e25]">
              {portalType === "customer" ? "Customer Portal" : "Agent Portal"}
            </h2>
            <div className="w-8" /> {/* Spacer */}
          </div>
        </Container>
      </div>

      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:block w-72 min-h-screen bg-white border-r border-gray-200 sticky top-0 overflow-y-auto">
          <div className="p-5">
            {/* User Profile */}
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
              <div className="w-12 h-12 rounded-full bg-[#f7ece9] flex items-center justify-center flex-shrink-0">
                {userImage ? (
                  <img
                    src={userImage}
                    alt={userName}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="w-6 h-6 text-[#ac3e25]" />
                )}
              </div>
              <div className="min-w-0">
                <h3 className="font-poppins font-semibold text-sm text-gray-800 truncate">
                  {userName}
                </h3>
                <p className="font-poppins text-xs text-gray-500 capitalize">
                  {userRole}
                </p>
              </div>
            </div>

            {/* Navigation - Responsive sizing */}
            <nav className="space-y-1">
              {navLinks.map((link) => {
                const hasChildren = link.children && link.children.length > 0;
                const isExpanded = expandedMenus.includes(link.label);
                const isActive = isActiveRoute(link.to);

                if (hasChildren) {
                  return (
                    <div key={link.label}>
                      <button
                        onClick={() => toggleMenu(link.label)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg font-poppins text-sm transition-colors ${
                          isActive || isExpanded
                            ? "bg-[#f7ece9] text-[#ac3e25]"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <span className="flex items-center gap-2.5 min-w-0">
                          <span className="flex-shrink-0">{link.icon}</span>
                          <span className="truncate">{link.label}</span>
                        </span>
                        <ChevronRight
                          size={16}
                          className={`flex-shrink-0 transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
                        />
                      </button>
                      {isExpanded && (
                        <div className="ml-7 mt-1 space-y-1">
                          {link.children?.map((child) => (
                            <NavLink
                              key={child.to}
                              to={child.to}
                              className={({ isActive: isChildActive }) =>
                                `flex items-center gap-2.5 px-3 py-2 rounded-lg font-poppins text-sm transition-colors ${
                                  isChildActive
                                    ? "bg-[#f7ece9] text-[#ac3e25]"
                                    : "text-gray-600 hover:bg-gray-100"
                                }`
                              }
                            >
                              <span className="flex-shrink-0">
                                {child.icon}
                              </span>
                              <span className="truncate">{child.label}</span>
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive: isLinkActive }) =>
                      `flex items-center gap-2.5 px-3 py-2.5 rounded-lg font-poppins text-sm transition-colors ${
                        isLinkActive
                          ? "bg-[#f7ece9] text-[#ac3e25]"
                          : "text-gray-700 hover:bg-gray-100"
                      }`
                    }
                  >
                    <span className="flex-shrink-0">{link.icon}</span>
                    <span className="truncate">{link.label}</span>
                  </NavLink>
                );
              })}
            </nav>

            {/* Logout */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={() => {
                  /* Handle logout */
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg font-poppins text-sm text-red-600 transition-colors hover:bg-red-50"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {isMobileSidebarOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/50 lg:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}

        {/* Mobile Sidebar - Same as desktop but with slightly smaller text */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-72 bg-white transform transition-transform duration-300 ${
            isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:hidden`}
        >
          <div className="p-4 h-full overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-poppins font-semibold text-[#ac3e25] text-sm">
                {portalType === "customer" ? "Customer Portal" : "Agent Portal"}
              </h2>
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="rounded-lg p-2 hover:bg-gray-100"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* User Profile - Mobile */}
            <div className="flex items-center gap-2.5 mb-4 pb-4 border-b border-gray-200">
              <div className="w-10 h-10 rounded-full bg-[#f7ece9] flex items-center justify-center flex-shrink-0">
                {userImage ? (
                  <img
                    src={userImage}
                    alt={userName}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="w-5 h-5 text-[#ac3e25]" />
                )}
              </div>
              <div className="min-w-0">
                <h3 className="font-poppins font-semibold text-sm text-gray-800 truncate">
                  {userName}
                </h3>
                <p className="font-poppins text-xs text-gray-500 capitalize">
                  {userRole}
                </p>
              </div>
            </div>

            {/* Navigation - Mobile */}
            <nav className="space-y-0.5">
              {navLinks.map((link) => {
                const hasChildren = link.children && link.children.length > 0;
                const isExpanded = expandedMenus.includes(link.label);
                const isActive = isActiveRoute(link.to);

                if (hasChildren) {
                  return (
                    <div key={link.label}>
                      <button
                        onClick={() => toggleMenu(link.label)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-poppins text-xs transition-colors ${
                          isActive || isExpanded
                            ? "bg-[#f7ece9] text-[#ac3e25]"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <span className="flex items-center gap-2 min-w-0">
                          <span className="flex-shrink-0">{link.icon}</span>
                          <span className="truncate">{link.label}</span>
                        </span>
                        <ChevronRight
                          size={14}
                          className={`flex-shrink-0 transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
                        />
                      </button>
                      {isExpanded && (
                        <div className="ml-6 mt-0.5 space-y-0.5">
                          {link.children?.map((child) => (
                            <NavLink
                              key={child.to}
                              to={child.to}
                              onClick={() => setIsMobileSidebarOpen(false)}
                              className={({ isActive: isChildActive }) =>
                                `flex items-center gap-2 px-3 py-1.5 rounded-lg font-poppins text-xs transition-colors ${
                                  isChildActive
                                    ? "bg-[#f7ece9] text-[#ac3e25]"
                                    : "text-gray-600 hover:bg-gray-100"
                                }`
                              }
                            >
                              <span className="flex-shrink-0">
                                {child.icon}
                              </span>
                              <span className="truncate">{child.label}</span>
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className={({ isActive: isLinkActive }) =>
                      `flex items-center gap-2 px-3 py-2 rounded-lg font-poppins text-xs transition-colors ${
                        isLinkActive
                          ? "bg-[#f7ece9] text-[#ac3e25]"
                          : "text-gray-700 hover:bg-gray-100"
                      }`
                    }
                  >
                    <span className="flex-shrink-0">{link.icon}</span>
                    <span className="truncate">{link.label}</span>
                  </NavLink>
                );
              })}
            </nav>

            {/* Logout - Mobile */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  /* Handle logout */
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg font-poppins text-xs text-red-600 transition-colors hover:bg-red-50"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
