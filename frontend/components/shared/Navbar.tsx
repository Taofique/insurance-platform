import { Link, NavLink } from "react-router";
import { ChevronDown, ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import Container from "./Container";
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
        <div className="flex items-center py-2 sm:py-3 md:py-[14px]">
          {/* Logo - matches Figma design height */}
          <Link to="/" className="shrink-0">
            <img
              src={logo}
              alt="Purabi General Insurance Co. Ltd."
              className="h-5 w-auto sm:h-6 md:h-6 lg:h-6"
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
                      "flex items-center gap-1 px-1.5 py-1.5 text-xs capitalize whitespace-nowrap transition-colors hover:text-[#ac3e25] sm:px-2 lg:gap-[6px] lg:px-3 lg:py-2 lg:text-sm xl:gap-[10px] xl:px-[20px] xl:py-[14px] xl:text-lg",
                      isActive
                        ? "border-b-2 border-[#9f0101] text-[#9f0101]"
                        : "text-black",
                    ].join(" ")
                  }
                >
                  {link.label}
                  {link.hasDropdown && (
                    <ChevronDown
                      size={14}
                      className="lg:size-[18px] xl:size-[24px]"
                    />
                  )}
                </NavLink>
              ))}
            </nav>

            <Link
              to="/get-a-quote"
              className="flex items-center gap-1.5 rounded-[5px] border border-black/20 bg-[#ac3e25] px-2.5 py-1.5 text-xs capitalize text-white transition-colors hover:bg-[#9a3620] sm:px-3 lg:gap-2 lg:px-4 lg:py-2 lg:text-sm xl:gap-[15px] xl:px-[35px] xl:py-[14px] xl:text-lg"
            >
              Get A Quote
              <ArrowUpRight
                size={14}
                className="lg:size-[18px] xl:size-[25px]"
              />
            </Link>
          </div>

          {/* Mobile Menu Button - visible below md */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-lg p-1.5 hover:bg-gray-100 md:hidden"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X size={20} className="text-black sm:size-[22px]" />
            ) : (
              <Menu size={20} className="text-black sm:size-[22px]" />
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
                      "flex items-center justify-between rounded-lg px-4 py-2.5 text-sm capitalize transition-colors hover:bg-gray-50 sm:py-3 sm:text-base",
                      isActive
                        ? "bg-[#ac3e25]/10 text-[#9f0101]"
                        : "text-black",
                    ].join(" ")
                  }
                >
                  {link.label}
                  {link.hasDropdown && (
                    <ChevronDown size={18} className="sm:size-[20px]" />
                  )}
                </NavLink>
              ))}

              <Link
                to="/get-a-quote"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-[5px] bg-[#ac3e25] px-6 py-2.5 text-sm capitalize text-white transition-colors hover:bg-[#9a3620] sm:py-3 sm:text-base"
              >
                Get A Quote
                <ArrowUpRight size={18} className="sm:size-[20px]" />
              </Link>
            </nav>
          </div>
        )}
      </Container>
    </div>
  );
}
