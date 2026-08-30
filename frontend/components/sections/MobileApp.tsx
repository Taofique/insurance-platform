import Container from "../shared/Container";
import cardBackground from "../../app/assets/mobile-app/background.png";
import devices from "../../app/assets/mobile-app/Devices.png";
import apple from "../../app/assets/mobile-app/Apple.svg";
import googlePlay from "../../app/assets/mobile-app/googleplay.svg";
import playstore from "../../app/assets/mobile-app/Playstore.svg";

export default function MobileApp() {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-[50px]">
      <Container>
        <div className="relative overflow-hidden rounded-[20px] border border-black/20 bg-gradient-to-b from-white to-[#ac3e25]/10 pt-10 sm:pt-[50px]">
          <img
            src={cardBackground}
            alt=""
            className="pointer-events-none absolute inset-0 size-full object-cover opacity-10"
          />

          <div className="relative mx-auto flex max-w-[1040px] flex-col items-center px-5 text-center sm:px-10">
            <div className="flex items-center gap-1">
              <span className="h-px w-8 bg-[#ac3e25] sm:w-10" />
              <p className="font-poppins text-sm font-semibold uppercase text-[#ac3e25]">
                Get Our Mobile App
              </p>
              <span className="h-px w-8 bg-[#ac3e25] sm:w-10" />
            </div>

            <h2 className="mt-2 font-poppins text-3xl font-bold uppercase text-black sm:text-4xl lg:text-[45px]">
              Experienced Our Mobile App
            </h2>

            <p className="mt-3 max-w-[1036px] font-poppins text-sm leading-6 text-black/70 sm:text-base">
              Simplify your insurance experience with our mobile app. Access
              your policy details, track claims, and receive instant updates
              anytime, anywhere. Stay in control of your coverage with just a
              few taps. Download now for convenience and peace of mind!
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-5">
              {/* Google Play Button */}
              <a
                href="#google-play"
                aria-label="Get the app on Google Play"
                className="group grid h-10 w-[120px] grid-cols-[21px_1fr] items-center gap-[7px] rounded-[6px] border border-[#a6a6a6] bg-black px-[7px] text-left transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-[#ac3e25] hover:bg-[#ac3e25] hover:shadow-lg active:scale-95"
              >
                <img
                  src={playstore}
                  alt=""
                  className="size-[21px] object-contain transition-transform duration-300 group-hover:scale-110"
                />

                <span className="flex min-w-0 flex-col justify-center">
                  <span className="text-[9px] leading-[10px] text-white transition-colors duration-300 group-hover:text-white">
                    GET IT ON
                  </span>
                  <img
                    src={googlePlay}
                    alt="Google Play"
                    className="mt-[2px] h-[14px] w-[74px] object-contain object-left transition-all duration-300 group-hover:brightness-0 group-hover:invert"
                  />
                </span>
              </a>

              {/* App Store Button */}
              <a
                href="#app-store"
                aria-label="Download the app from the App Store"
                className="group grid h-10 w-[120px] grid-cols-[20px_1fr] items-center gap-[8px] rounded-[6px] border border-[#a6a6a6] bg-black px-[7px] text-left transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-[#ac3e25] hover:bg-[#ac3e25] hover:shadow-lg active:scale-95"
              >
                <img
                  src={apple}
                  alt=""
                  className="h-6 w-5 object-contain transition-transform duration-300 group-hover:scale-110"
                />

                <span className="flex min-w-0 flex-col justify-center text-white transition-colors duration-300">
                  <span className="text-[9px] leading-[10px] transition-colors duration-300 group-hover:text-white">
                    Download on the
                  </span>
                  <span className="mt-[1px] text-[17px] leading-[17px] tracking-[-0.4px] transition-colors duration-300 group-hover:text-white">
                    App Store
                  </span>
                </span>
              </a>
            </div>
          </div>

          <div className="relative mt-8 flex justify-center overflow-hidden sm:mt-10">
            <img
              src={devices}
              alt="Purabi insurance mobile application previews"
              className="h-auto w-[300px] max-w-none sm:w-[400px]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
