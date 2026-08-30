import { useState } from "react";
import {
  HeartPulse,
  Car,
  Luggage,
  Users,
  Ship,
  HardHat,
  MoreHorizontal,
  ArrowUpRight,
  Home,
  Plane,
  Shield,
  Building2,
  ChevronUp,
} from "lucide-react";
import Container from "../shared/Container";
import Button from "../ui/Button";

const categories = [
  { key: "health", label: "Health", icon: HeartPulse },
  { key: "car", label: "Car", icon: Car },
  { key: "travel", label: "Travel", icon: Luggage },
  { key: "life", label: "Life", icon: Users },
  { key: "marine", label: "Marine", icon: Ship },
  { key: "engineering", label: "Engineering", icon: HardHat },
];

const moreCategories = [
  { key: "home", label: "Home", icon: Home },
  { key: "aviation", label: "Aviation", icon: Plane },
  { key: "security", label: "Security", icon: Shield },
  { key: "property", label: "Property", icon: Building2 },
];

export default function QuickQuoteBar() {
  const [selected, setSelected] = useState("health");
  const [showMore, setShowMore] = useState(false);

  return (
    <section className="bg-[#f7ecea] py-12 lg:py-[100px]">
      <Container className="flex flex-col items-center gap-10 lg:gap-[50px]">
        {/* Category selector */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:gap-10">
          {/* Main categories */}
          {categories.map(({ key, label, icon: Icon }) => {
            const isActive = selected === key;

            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelected(key)}
                className="flex w-[80px] flex-col items-center gap-1.5 sm:w-[100px] sm:gap-[5px]"
              >
                <span
                  className={`flex size-16 items-center justify-center rounded-full sm:size-20 lg:size-[100px] ${
                    isActive ? "bg-[#ac3e25]" : "bg-[#ac3e25]/10"
                  }`}
                >
                  <Icon
                    size={28}
                    className={`sm:size-8 lg:size-[50px] ${
                      isActive ? "text-white" : "text-[#ac3e25]"
                    }`}
                  />
                </span>

                <span
                  className={`font-poppins text-sm capitalize sm:text-lg ${
                    isActive ? "font-medium text-[#ac3e25]" : "text-black/50"
                  }`}
                >
                  {label}
                </span>
              </button>
            );
          })}

          {/* Extra categories */}
          {showMore &&
            moreCategories.map(({ key, label, icon: Icon }) => {
              const isActive = selected === key;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelected(key)}
                  className="flex w-[80px] flex-col items-center gap-1.5 sm:w-[100px] sm:gap-[5px]"
                >
                  <span
                    className={`flex size-16 items-center justify-center rounded-full sm:size-20 lg:size-[100px] ${
                      isActive ? "bg-[#ac3e25]" : "bg-[#ac3e25]/10"
                    }`}
                  >
                    <Icon
                      size={28}
                      className={`sm:size-8 lg:size-[50px] ${
                        isActive ? "text-white" : "text-[#ac3e25]"
                      }`}
                    />
                  </span>

                  <span
                    className={`font-poppins text-sm capitalize sm:text-lg ${
                      isActive ? "font-medium text-[#ac3e25]" : "text-black/50"
                    }`}
                  >
                    {label}
                  </span>
                </button>
              );
            })}

          {/* More / Less button */}
          <button
            type="button"
            onClick={() => setShowMore(!showMore)}
            className="flex w-[80px] flex-col items-center gap-1.5 sm:w-[100px] sm:gap-[5px]"
          >
            <span className="flex size-16 items-center justify-center rounded-full bg-[#ac3e25]/10 transition-all duration-300 hover:bg-[#ac3e25] sm:size-20 lg:size-[100px]">
              {showMore ? (
                <ChevronUp
                  size={28}
                  className="text-[#ac3e25] transition-colors duration-300 hover:text-white sm:size-8 lg:size-[50px]"
                />
              ) : (
                <MoreHorizontal
                  size={28}
                  className="text-[#ac3e25] transition-colors duration-300 hover:text-white sm:size-8 lg:size-[50px]"
                />
              )}
            </span>

            <span className="font-poppins text-sm capitalize text-black/50 sm:text-lg">
              {showMore ? "Less" : "More"}
            </span>
          </button>
        </div>

        {/* Quick quote form */}
        <form className="flex w-full flex-col items-stretch gap-5 lg:flex-row lg:items-end lg:gap-8">
          <div className="flex flex-1 flex-col gap-2 lg:gap-[15px]">
            <label className="font-poppins text-lg font-bold sm:text-xl">
              Name
            </label>

            <input
              type="text"
              placeholder="Enter Your Full Name"
              className="w-full rounded-[5px] border border-[#ac3e25]/20 bg-white px-5 py-3.5 font-poppins text-base text-black/50 italic placeholder:italic sm:px-7 sm:py-[15px] sm:text-lg"
            />
          </div>

          <div className="flex flex-1 flex-col gap-2 lg:gap-[15px]">
            <label className="font-poppins text-lg font-bold sm:text-xl">
              Mobile Number
            </label>

            <input
              type="tel"
              placeholder="Enter Your Valid Phone Number"
              className="w-full rounded-[5px] border border-[#ac3e25]/20 bg-white px-5 py-3.5 font-poppins text-base text-black/50 italic placeholder:italic sm:px-7 sm:py-[15px] sm:text-lg"
            />
          </div>

          <Button
            href="/life-insurance"
            variant="primary"
            size="lg"
            icon={<ArrowUpRight size={20} />}
            iconPosition="right"
            fullWidth
            className="lg:w-auto"
          >
            Get Price
          </Button>
        </form>
      </Container>
    </section>
  );
}
