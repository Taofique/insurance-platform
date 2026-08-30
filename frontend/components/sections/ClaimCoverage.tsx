import { ArrowUpRight } from "lucide-react";
import Container from "../shared/Container";
import Button from "../ui/Button";
import leftFamily from "../../app/assets/claim-coverage/left-family.png";
import leftFamilyBorder from "../../app/assets/claim-coverage/left-round-border-family.png";
import cardBackground from "../../app/assets/claim-coverage/rightSide-card-bg.png";

export default function ClaimCoverage() {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-[50px]">
      <Container>
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="relative w-full max-w-[500px] shrink-0 lg:h-[400px]">
            <img
              src={leftFamilyBorder}
              alt=""
              className="absolute left-[12%] top-0 w-[56%] opacity-30"
            />
            <img
              src={leftFamily}
              alt="A family protected by insurance"
              className="relative z-10 mt-10 w-full object-contain lg:mt-[60px]"
            />
          </div>

          <div className="relative w-full overflow-hidden rounded-[20px] border border-black/20 bg-[#ac3e25]/10 px-6 py-8 sm:px-10 sm:py-12 lg:px-10 lg:py-[50px]">
            <img
              src={cardBackground}
              alt=""
              className="pointer-events-none absolute inset-0 size-full object-cover opacity-20"
            />

            <div className="relative flex flex-col items-start gap-6">
              <div>
                <p className="font-poppins text-sm font-semibold tracking-wide text-[#444] sm:text-base">
                  BE HAPPY TO GET INSURANCE
                </p>

                <h2 className="mt-1 font-poppins text-3xl font-bold text-[#444] sm:text-4xl lg:text-[45px] lg:leading-tight">
                  Start Tracking Your Claims
                </h2>

                <p className="mt-2 max-w-[620px] font-poppins text-sm leading-6 text-black/70 sm:text-base">
                  Enjoy peace of mind with hassle-free insurance. Track your
                  claims effortlessly and stay informed every step of the way.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-5">
                <Button
                  href="/claims"
                  variant="primary"
                  size="lg"
                  icon={<ArrowUpRight size={20} />}
                  iconPosition="right"
                >
                  Claim Coverage
                </Button>

                <div className="flex items-center gap-3" aria-hidden="true">
                  <span className="h-px w-9 bg-[#ac3e25]" />
                  <span className="text-sm font-semibold text-black">OR</span>
                  <span className="h-px w-9 bg-[#ac3e25]" />
                </div>

                <p className="font-poppins text-sm text-[#444]">
                  <span className="text-xs text-[#444]/50">
                    Mail Us Anytime:{" "}
                  </span>
                  <a
                    href="mailto:purabiinsurance@gmail.com"
                    className="font-bold hover:text-[#ac3e25]"
                  >
                    purabiinsurance@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}