import { Play } from "lucide-react";
import Container from "../shared/Container";
import cardPattern from "../../app/assets/about-us/why-choose-us/Leftcards-background-image.png";
import safeMoneyIcon from "../../app/assets/about-us/why-choose-us/safe-money-icon.png";
import moneyBackIcon from "../../app/assets/about-us/why-choose-us/anytime-money-back-icon.png";
import fastProcessIcon from "../../app/assets/about-us/why-choose-us/fast-process-icon.png";
import panelImage from "../../app/assets/about-us/why-choose-us/right-family-image.png";
import playIcon from "../../app/assets/about-us/why-choose-us/right-videoPlay-icon.png";

const features = [
  {
    title: "100% Safe Money",
    description: "Your money is 100% secure with us, ensuring peace of mind.",
    icon: safeMoneyIcon,
  },
  {
    title: "Anytime Money Back",
    description:
      "Access your money anytime with Anytime Money Back for maximum convenience.",
    icon: moneyBackIcon,
  },
  {
    title: "Fast Process",
    description:
      "Experience a Fast Process with quick and efficient solutions tailored to your needs.",
    icon: fastProcessIcon,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-12 lg:py-[100px]">
      <Container className="flex flex-col gap-10 lg:flex-row lg:items-end lg:gap-5">
        {/* Feature cards */}
        <div className="flex flex-1 flex-col gap-6 lg:gap-[30px]">
          {features.map(({ title, description, icon }) => (
            <div key={title} className="relative">
              <div className="relative mt-4 overflow-hidden rounded-[20px] border border-black/20 py-5 pl-[110px] pr-5 sm:pl-[140px]">
                <div className="absolute inset-0 bg-gradient-to-r from-[#ac3e25]/10 to-white/0" />
                <img
                  src={cardPattern}
                  alt=""
                  className="absolute inset-0 size-full object-cover opacity-20"
                />
                <div className="relative flex flex-col gap-2">
                  <h3 className="bg-gradient-to-t from-[#ac3e25] to-[#46190f] bg-clip-text font-poppins text-xl font-semibold text-transparent sm:text-2xl">
                    {title}
                  </h3>
                  <p className="font-poppins text-base text-black/70">
                    {description}
                  </p>
                </div>
              </div>

              <div className="absolute -top-2 left-4 flex w-[90px] items-center justify-center rounded-bl-[20px] rounded-br-[20px] rounded-tl-[20px] border-[3px] border-white bg-[#ac3e25] py-6 shadow-lg sm:w-[100px]">
                <img src={icon} alt="" className="size-12 sm:size-16" />
              </div>
            </div>
          ))}
        </div>

        {/* Heading + video panel */}
        <div className="flex flex-1 flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-gradient-to-l from-[#ac3e25] to-[#46190f]" />
              <span className="bg-gradient-to-l from-[#ac3e25] to-[#46190f] bg-clip-text font-poppins text-sm font-semibold uppercase text-transparent">
                Why Choose Us
              </span>
            </div>

            <h2 className="font-poppins text-3xl font-bold text-black sm:text-4xl lg:text-[45px] lg:leading-[50px]">
              Why You Should Choose Our Insurance Policy's
            </h2>

            <p className="font-poppins text-base text-black/70">
              Choose our insurance policy for comprehensive coverage, reliable
              protection, hassle-free claims, and a customer-focused experience.
            </p>
          </div>

          <div className="relative h-[220px] overflow-hidden rounded-[20px] border-4 border-white shadow-xl sm:h-[298px]">
            <img
              src={panelImage}
              alt=""
              className="absolute inset-0 size-full object-cover"
            />
            <button
              type="button"
              aria-label="Play video"
              className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#ac3e25] bg-white/20 backdrop-blur-[5px] transition-transform hover:scale-105 sm:size-20"
            >
              <img src={playIcon} alt="" className="size-5 object-contain" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
