import { MapPin, Mail, Phone } from "lucide-react";
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
        <div className="flex flex-col items-center gap-2 py-2 lg:flex-row lg:justify-between lg:gap-4">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs font-medium sm:gap-x-5 xl:flex-nowrap">
            <span className="hidden items-center gap-2 capitalize xl:flex">
              <MapPin size={12} className="shrink-0" />
              <span>
                Sandhani Life Tower (2nd Floor), 34 Bangla Motor, Dhaka - 1000.
              </span>
            </span>

            <span className="flex items-center gap-2 capitalize xl:hidden">
              <MapPin size={12} className="shrink-0" />
              <span>34 Bangla Motor, Dhaka</span>
            </span>

            <a
              href="mailto:purabiinsurance@gmail.com"
              className="flex items-center gap-2 lowercase hover:opacity-80"
            >
              <Mail size={12} className="shrink-0" />
              <span className="hidden sm:inline">
                purabiinsurance@gmail.com
              </span>
              <span className="sm:hidden">Email</span>
            </a>

            <a
              href="tel:+8801714044146"
              className="flex items-center gap-2 hover:opacity-80"
            >
              <Phone size={12} className="shrink-0" />
              <span className="hidden sm:inline">+880 1714-044146</span>
              <span className="sm:hidden">Call</span>
            </a>
          </div>

          {/* Right side - Portals & Social */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            {/* Portal Links - Better spacing */}
            <div className="flex items-center">
              <a
                href="/client-portal"
                className="px-2 py-1 text-[10px] uppercase hover:opacity-80 sm:px-3 sm:text-xs lg:px-[15px] lg:py-[5px] lg:text-sm"
              >
                Client Portal
              </a>
              <span className="hidden h-4 w-px bg-white/30 sm:block" />
              <a
                href="/agent-portal"
                className="px-2 py-1 text-[10px] uppercase hover:opacity-80 sm:px-3 sm:text-xs lg:px-[15px] lg:py-[5px] lg:text-sm"
              >
                Agent Portal
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex size-6 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 sm:size-7 lg:size-7.5"
                >
                  <Icon size={10} className="sm:size-3 lg:size-[14px]" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
