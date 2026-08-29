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
  { label: "Blogs", to: "/blog" },
  { label: "Contact Us", to: "/contact" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="border-b border-[#ab3d24]/50 bg-white">
      <Container>
        {/* Main Navbar - flex container without justify-between */}
        <div className="flex items-center py-2 sm:py-3 md:py-3.5">
          {/* Logo - matches Figma design height */}
          <Link to="/" className="shrink-0">
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
              {navLinks.map((link) => (
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
                  {link.hasDropdown && (
                    <ChevronDown size={14} className="lg:size-4.5 xl:size-6" />
                  )}
                </NavLink>
              ))}
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

        {/* Mobile Menu - visible below md */}
        {isMobileMenuOpen && (
          <div className="border-t border-gray-100 py-3 md:hidden">
            <nav className="flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.to}
                  onClick={() => setIsMobileMenuOpen(false)}
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
                  {link.hasDropdown && (
                    <ChevronDown size={18} className="sm:size-5" />
                  )}
                </NavLink>
              ))}

              {/* Reusable Button in Mobile Menu */}
              <Button
                href="/get-a-quote"
                variant="primary"
                size="md"
                fullWidth
                icon={<ArrowUpRight size={18} className="sm:size-5" />}
                iconPosition="right"
                className="mt-2"
              >
                Get A Quote
              </Button>
            </nav>
          </div>
        )}
      </Container>
    </div>
  );
}
