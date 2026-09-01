import { Link, NavLink } from "react-router";
import { ChevronDown, ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import Container from "./Container";
import Button from "../ui/Button";
import logo from "../../app/assets/brand-logo.jpg";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/insurance", hasDropdown: true },
  { label: "Claims", to: "/claims", hasDropdown: true },
  { label: "Blogs", to: "/blogs" },
  { label: "Contact Us", to: "/contact" },
];

// Dummy services data
const servicesData = [
  { label: "Health Insurance", to: "/health-insurance" },
  { label: "Life Insurance", to: "/life-insurance" },
  { label: "Property Insurance", to: "/property-insurance" },
  { label: "Travel Insurance", to: "/travel-insurance" },
  { label: "Business Insurance", to: "/business-insurance" },
  { label: "Auto Insurance", to: "/auto-insurance" },
  { label: "Home Insurance", to: "/home-insurance" },
  { label: "Liability Insurance", to: "/liability-insurance" },
  { label: "Medical Insurance", to: "/medical-insurance" },
  { label: "Critical Illness Insurance", to: "/critical-illness" },
];

// Dummy claims data
const claimsData = [
  { label: "File a Claim", to: "/claims/file" },
  { label: "Track Claim Status", to: "/claims/track" },
  { label: "Claim History", to: "/claims/history" },
  { label: "Claim Documents", to: "/claims/documents" },
  { label: "Claim FAQs", to: "/claims/faqs" },
  { label: "Claim Settlement Process", to: "/claims/process" },
  { label: "Emergency Claims", to: "/claims/emergency" },
  { label: "Claim Support", to: "/claims/support" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const closeDropdowns = () => {
    setOpenDropdown(null);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="sticky top-0 z-50 border-b border-[#ab3d24]/50 bg-white">
      <Container>
        {/* Main Navbar - flex container without justify-between */}
        <div className="flex items-center py-2 sm:py-3 md:py-3.5">
          {/* Logo - matches Figma design height */}
          <Link to="/" className="shrink-0" onClick={closeMobileMenu}>
            <img
              src={logo}
              alt="Purabi General Insurance Co. Ltd."
              className="h-5 w-auto sm:h-6 md:h-8 lg:h-8"
            />
          </Link>

          {/* Spacer to push nav to the right */}
          <div className="flex-1" />

          {/* Desktop Navigation - visible from md (768px) */}
          <div className="hidden items-center gap-2 md:flex lg:gap-3 xl:gap-5">
            <nav className="flex items-center gap-0.5 lg:gap-1 xl:gap-1.5">
              {navLinks.map((link) => {
                const hasDropdown = link.hasDropdown;
                const isOpen = openDropdown === link.label;

                if (hasDropdown) {
                  return (
                    <div
                      key={link.label}
                      className="relative"
                      onMouseEnter={() => setOpenDropdown(link.label)}
                      onMouseLeave={closeDropdowns}
                    >
                      <button
                        onClick={() => toggleDropdown(link.label)}
                        className="flex items-center gap-1 px-1.5 py-1.5 text-xs capitalize whitespace-nowrap transition-colors hover:text-[#ac3e25] sm:px-2 lg:gap-1.5 lg:px-3 lg:py-2 lg:text-sm xl:gap-2.5 xl:px-5 xl:py-3.5 xl:text-lg font-poppins text-black"
                      >
                        {link.label}
                        <ChevronDown
                          size={14}
                          className={`lg:size-4.5 xl:size-6 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Dropdown Menu - with higher z-index */}
                      {isOpen && (
                        <div className="absolute left-0 top-full mt-1 min-w-[220px] rounded-lg bg-white py-2 shadow-lg ring-1 ring-black/5 z-50">
                          {link.label === "Services"
                            ? servicesData.map((item) => (
                                <Link
                                  key={item.label}
                                  to={item.to}
                                  onClick={closeDropdowns}
                                  className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-[#f7ece9] hover:text-[#ac3e25] font-poppins"
                                >
                                  {item.label}
                                </Link>
                              ))
                            : link.label === "Claims"
                              ? claimsData.map((item) => (
                                  <Link
                                    key={item.label}
                                    to={item.to}
                                    onClick={closeDropdowns}
                                    className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-[#f7ece9] hover:text-[#ac3e25] font-poppins"
                                  >
                                    {item.label}
                                  </Link>
                                ))
                              : null}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <NavLink
                    key={link.label}
                    to={link.to}
                    className={({ isActive }) =>
                      [
                        "flex items-center gap-1 px-1.5 py-1.5 text-xs capitalize whitespace-nowrap transition-colors hover:text-[#ac3e25] sm:px-2 lg:gap-1.5 lg:px-3 lg:py-2 lg:text-sm xl:gap-2.5 xl:px-5 xl:py-3.5 xl:text-lg font-poppins",
                        isActive
                          ? "border-b-2 border-[#9f0101] text-[#9f0101]"
                          : "text-black",
                      ].join(" ")
                    }
                  >
                    {link.label}
                  </NavLink>
                );
              })}
            </nav>

            {/* Reusable Button Component */}
            <Button
              href="/get-a-quote"
              variant="primary"
              size="md"
              icon={<ArrowUpRight size={18} className="xl:size-6" />}
              iconPosition="right"
            >
              Get A Quote
            </Button>
          </div>

          {/* Mobile Menu Button - visible below md */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-lg p-1.5 hover:bg-gray-100 md:hidden"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X size={20} className="text-black sm:size-5.5" />
            ) : (
              <Menu size={20} className="text-black sm:size-5.5" />
            )}
          </button>
        </div>

        {/* Mobile Menu - visible below md with higher z-index */}
        {isMobileMenuOpen && (
          <div className="absolute left-0 right-0 top-full border-t border-gray-100 bg-white py-3 shadow-lg z-50 md:hidden">
            <Container>
              <nav className="flex flex-col gap-0.5">
                {navLinks.map((link) => {
                  const hasDropdown = link.hasDropdown;
                  const isOpen = openDropdown === link.label;

                  if (hasDropdown) {
                    return (
                      <div key={link.label} className="flex flex-col">
                        <button
                          onClick={() => toggleDropdown(link.label)}
                          className="flex items-center justify-between rounded-lg px-4 py-2.5 text-sm capitalize transition-colors hover:bg-gray-50 sm:py-3 sm:text-base font-poppins text-black"
                        >
                          {link.label}
                          <ChevronDown
                            size={18}
                            className={`sm:size-5 transition-transform duration-200 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {/* Mobile Dropdown Items */}
                        {isOpen && (
                          <div className="ml-4 border-l-2 border-[#ac3e25]/30 pl-4">
                            {(link.label === "Services"
                              ? servicesData
                              : claimsData
                            ).map((item) => (
                              <Link
                                key={item.label}
                                to={item.to}
                                onClick={() => {
                                  closeDropdowns();
                                  closeMobileMenu();
                                }}
                                className="block rounded-lg px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-[#f7ece9] hover:text-[#ac3e25] font-poppins"
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <NavLink
                      key={link.label}
                      to={link.to}
                      onClick={closeMobileMenu}
                      className={({ isActive }) =>
                        [
                          "flex items-center justify-between rounded-lg px-4 py-2.5 text-sm capitalize transition-colors hover:bg-gray-50 sm:py-3 sm:text-base font-poppins",
                          isActive
                            ? "bg-[#ac3e25]/10 text-[#9f0101]"
                            : "text-black",
                        ].join(" ")
                      }
                    >
                      {link.label}
                    </NavLink>
                  );
                })}

                {/* Divider */}
                <div className="my-2 border-t border-gray-200" />

                {/* Auth Links - Added here */}
                <div className="flex flex-col gap-0.5">
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="rounded-lg px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 font-poppins text-[#ac3e25] flex items-center gap-2"
                  >
                    <span className="text-base">🔐</span>
                    Client Portal
                  </Link>
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="rounded-lg px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 font-poppins text-[#ac3e25] flex items-center gap-2"
                  >
                    <span className="text-base">🔐</span>
                    Agent Portal
                  </Link>

                  {/* Sign Up Link */}
                  <Link
                    to="/signup"
                    onClick={closeMobileMenu}
                    className="rounded-lg px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 font-poppins text-[#ac3e25] flex items-center gap-2"
                  >
                    <span className="text-base">📝</span>
                    Sign Up
                  </Link>
                </div>

                {/* Get A Quote - Using Link directly instead of Button to ensure onClick works */}
                <Link
                  to="/get-a-quote"
                  onClick={closeMobileMenu}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-[#ac3e25] px-6 py-3 font-poppins font-medium text-white transition-colors hover:bg-[#8a3220]"
                >
                  Get A Quote
                  <ArrowUpRight size={18} className="sm:size-5" />
                </Link>
              </nav>
            </Container>
          </div>
        )}
      </Container>
    </div>
  );
}
