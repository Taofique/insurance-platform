import { ArrowUpRight, ChevronDown } from "lucide-react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import Container from "./Container";
import Button from "../ui/Button";

const footerLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/insurance", hasDropdown: true },
  { label: "Claims", to: "/claims", hasDropdown: true },
  { label: "Blogs", to: "/blog" },
  { label: "Pay Premium", to: "/pay-premium" },
];

const socialLinks = [
  { icon: FaFacebookF, href: "#", label: "Facebook" },
  { icon: FaTwitter, href: "#", label: "Twitter" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
];

const legalLinks = [
  { label: "Teams & Condition", href: "#" },
  { label: "Privacy & Policy", href: "#" },
  { label: "Refund Policy", href: "#" },
];

// Pull every logo in the folder at build time — add a file, it just shows up.
const paymentLogos = import.meta.glob(
  "../../app/assets/payment-gateway/*.png",
  {
    eager: true,
    import: "default",
  },
) as Record<string, string>;

// Display order, matching the Figma layout
const paymentChannelOrder = [
  "Frame 53",
  "Frame 58",
  "Frame 52",
  "Frame 51",
  "Frame 55",
  "Frame 56",
  "Frame 57",
  "Frame 59",
  "Frame 60",
  "Frame 54",
  "Frame 61",
  "Frame 62",
  "Frame 63",
  "Frame 64",
  "Frame 65",
];

const paymentChannels = paymentChannelOrder.map((name) => ({
  name,
  src: paymentLogos[`../../app/assets/payment-gateway/${name}.png`],
}));

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#ac3e25]/0 to-[#ac3e25]/10">
      <Container className="flex flex-col items-center gap-10 pt-16 pb-10 lg:pt-24">
        {/* CTA */}
        <div className="flex flex-col items-center gap-5 text-center">
          <p className="font-poppins text-sm text-black/50 sm:text-base lg:text-[17px]">
            Are you ready?
          </p>
          <h2 className="font-poppins text-3xl font-bold sm:text-4xl lg:text-5xl">
            Get Your Insurance Now!
          </h2>
          <Button
            href="/get-a-quote"
            variant="primary"
            size="lg"
            icon={<ArrowUpRight size={22} />}
            iconPosition="right"
          >
            Buy Now
          </Button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.to}
              className="flex items-center gap-1 px-2 py-1.5 font-poppins text-xs capitalize hover:text-[#ac3e25] sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm lg:px-5 lg:py-3.5 lg:text-lg"
            >
              {link.label}
              {link.hasDropdown && (
                <ChevronDown size={16} className="sm:size-[20px]" />
              )}
            </a>
          ))}
        </nav>

        {/* Social + hours */}
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-black/70 transition-colors hover:text-[#ac3e25]"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
          <p className="font-poppins text-sm sm:text-lg">
            Sunday to Thursday : 10 AM to 6 PM
          </p>
        </div>

        {/* Payment channels */}
        <div className="flex w-full flex-col gap-3">
          <p className="font-poppins text-xs tracking-tight text-[#444]">
            Payment Channels
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {paymentChannels.map(({ name, src }) => (
              <div
                key={name}
                className="flex h-10 min-w-[80px] max-w-[90px] flex-1 items-center justify-center rounded-lg border border-[#ac3e25]/20 bg-white p-1.5 sm:h-12 sm:min-w-[95px] sm:max-w-[100px] sm:p-2"
              >
                {src ? (
                  <img
                    src={src}
                    alt={name}
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <span className="text-[8px] text-gray-400 sm:text-[10px]">
                    {name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Legal row */}
        <div className="flex w-full flex-col items-center gap-3 font-poppins text-xs text-[#444] sm:flex-row sm:justify-between sm:text-[15px]">
          <p>
            Copyright ©{" "}
            <span className="font-bold text-[#ac3e25]">360D Soul Limited</span>{" "}
            {new Date().getFullYear()}. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 lg:gap-12">
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-[#ac3e25]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
