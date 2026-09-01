import { MapPin, Mail, Phone } from "lucide-react";
import { Link } from "react-router";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import Container from "./Container";

const socialLinks = [
  { icon: FaFacebookF, href: "#", label: "Facebook" },
  { icon: FaTwitter, href: "#", label: "Twitter" },
  { icon: FaYoutube, href: "#", label: "YouTube" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
];

export default function Topbar() {
  return (
    <div className="bg-[#ac3e25] text-white">
      <Container>
        <div className="flex min-h-10 items-center justify-between gap-4 py-2 font-poppins">
          {/* Left side */}
          <div className="flex min-w-0 items-center gap-4 text-xs font-medium">
            {/* Address */}
            <div className="flex min-w-0 items-center gap-2">
              <MapPin size={12} className="shrink-0" />

              {/* Mobile */}
              <span className="truncate sm:hidden">34 Bangla Motor, Dhaka</span>

              {/* Tablet */}
              <span className="hidden truncate sm:block xl:hidden">
                34 Bangla Motor, Dhaka
              </span>

              {/* Desktop */}
              <span className="hidden truncate xl:block">
                Sandhani Life Tower (2nd Floor), 34 Bangla Motor, Dhaka - 1000.
              </span>
            </div>

            {/* Email */}
            <a
              href="mailto:purabiinsurance@gmail.com"
              className="hidden shrink-0 items-center gap-2 hover:opacity-80 md:flex"
            >
              <Mail size={12} />
              <span>purabiinsurance@gmail.com</span>
            </a>

            {/* Phone */}
            <a
              href="tel:+8801714044146"
              className="hidden shrink-0 items-center gap-2 lg:flex hover:opacity-80"
            >
              <Phone size={12} />
              <span>+880 1714-044146</span>
            </a>
          </div>

          {/* Right side */}
          <div className="flex shrink-0 items-center gap-3">
            {/* Portals */}
            <div className="hidden items-center sm:flex">
              <Link
                to="/login"
                className="px-2 py-1 text-xs uppercase hover:opacity-80"
              >
                Client Portal
              </Link>

              <span className="h-4 w-px bg-white/30" />

              <Link
                to="/login"
                className="px-2 py-1 text-xs uppercase hover:opacity-80"
              >
                Agent Portal
              </Link>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-1.5">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex size-6 items-center justify-center rounded-full bg-white/20 transition-colors hover:bg-white/30"
                >
                  <Icon size={12} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile contact row */}
        <div className="flex items-center justify-center gap-4 pb-2 text-[11px] md:hidden">
          <a
            href="mailto:purabiinsurance@gmail.com"
            className="flex items-center gap-1.5 hover:opacity-80"
          >
            <Mail size={11} />
            Email
          </a>

          <a
            href="tel:+8801714044146"
            className="flex items-center gap-1.5 hover:opacity-80"
          >
            <Phone size={11} />
            Call
          </a>
        </div>
      </Container>
    </div>
  );
}
