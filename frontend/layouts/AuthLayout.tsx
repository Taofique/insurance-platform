import { Link, useLocation } from "react-router";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { useState, useEffect } from "react";
import authImage1 from "../app/assets/auth/var1.png";
import authImage2 from "../app/assets/auth/var2.png";
import authImage3 from "../app/assets/auth/var3.png";
import authImage4 from "../app/assets/auth/var4.png";
import authImage5 from "../app/assets/auth/var5.jpg";
import authImage6 from "../app/assets/auth/var6.png";
import brandLogo from "../app/assets/ChatGPT Image Sep 1, 2026, 11_13_38 PM.png";

const tabs = [
  { label: "Login", to: "/login" },
  { label: "Sign Up", to: "/signup" },
];

const carouselImages = [
  authImage1,
  authImage2,
  authImage3,
  authImage4,
  authImage5,
  authImage6,
];

const socialLinks = [
  { icon: FaFacebookF, href: "#", label: "Facebook" },
  { icon: FaTwitter, href: "#", label: "Twitter" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
];

interface AuthLayoutProps {
  heading: string;
  subheading: string;
  children: React.ReactNode;
}

export default function AuthLayout({
  heading,
  subheading,
  children,
}: AuthLayoutProps) {
  const location = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1,
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-r from-[#AC3E25] to-[#46190F] p-4 sm:p-6 md:p-8">
      <div className="flex w-full max-w-[1100px] overflow-hidden rounded-[30px] bg-white shadow-xl sm:rounded-[40px] md:rounded-[50px]">
        {/* Left banner - hidden below lg */}
        <div className="relative hidden flex-1 flex-col justify-between overflow-hidden p-6 lg:flex lg:p-[40px] xl:p-[50px]">
          {/* Carousel Images */}
          {carouselImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt=""
              className={`absolute inset-0 size-full object-cover transition-opacity duration-1000 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          {/* Shadow overlay - top and left */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/30 to-transparent" />

          {/* Additional left shadow */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

          {/* Bottom gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          <div className="relative z-10 flex items-center justify-between">
            <div className="rounded-lg px-3 py-1.5 sm:px-4 sm:py-2">
              <img
                src={brandLogo}
                alt="Purabi General Insurance Co. Ltd."
                className="h-8 w-auto sm:h-9 md:h-10"
              />
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2.5">
              {tabs.map((tab) => {
                const isActive = location.pathname === tab.to;
                return (
                  <Link
                    key={tab.label}
                    to={tab.to}
                    className={`rounded-full px-4 py-2 sm:px-5 sm:py-2.5 lg:px-6 font-poppins text-xs sm:text-sm font-medium capitalize text-white backdrop-blur-[5px] transition-colors ${
                      isActive
                        ? "border border-white bg-white/10"
                        : "hover:bg-white/10"
                    }`}
                  >
                    {tab.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Carousel Dots */}
          <div className="relative z-10 flex items-start gap-2 sm:gap-2.5 md:gap-3">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-7 sm:w-8 md:w-10 bg-[#ac3e25]"
                    : "w-2.5 sm:w-3 md:w-3.5 bg-white/50 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right panel - Fixed height container */}
        <div className="flex w-full flex-1 flex-col items-center justify-center gap-6 p-6 sm:gap-8 sm:p-8 md:gap-[50px] md:p-10 lg:p-[50px]">
          <div className="flex w-full flex-col items-center gap-1 text-center text-[#444]">
            <h1 className="font-poppins text-2xl font-semibold capitalize sm:text-3xl md:text-4xl lg:text-[50px]">
              {heading}
            </h1>
            <p className="font-poppins text-xs capitalize sm:text-sm md:text-base">
              {subheading}
            </p>
          </div>

          {/* Fixed height container for form to prevent size changes */}
          <div className="w-full max-w-[400px] min-h-[280px] flex items-center justify-center transition-all duration-300">
            {children}
          </div>

          <div className="flex flex-col items-center gap-4 sm:gap-5">
            <div className="flex items-center gap-3 sm:gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-black/70 transition-colors hover:text-[#ac3e25]"
                >
                  <Icon size={16} className="sm:size-[18px] md:size-5" />
                </a>
              ))}
            </div>
            <p className="max-w-[380px] px-2 text-center font-poppins text-[10px] text-black/70 sm:max-w-[420px] sm:text-xs">
              By creating an account or logging in, you agree to our{" "}
              <a
                href="#"
                className="font-bold text-[#ac3e25] underline hover:opacity-80"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="font-bold text-[#ac3e25] underline hover:opacity-80"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
