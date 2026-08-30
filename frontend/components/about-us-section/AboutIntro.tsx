import Container from "../shared/Container";
import aboutMainImage from "../../app/assets/about-us/aboutUs/about-family-image-left.png";
import aboutSecondaryImage from "../../app/assets/about-us/aboutUs/about-left-bottom-image.png";
import reviewAvatar from "../../app/assets/about-us/aboutUs/about-left-review.png";
import successRateImage from "../../app/assets/about-us/aboutUs/about-right-image.png";
import barChartIcon from "../../app/assets/about-us/aboutUs/about-barChart-icon.png";
import tickIcon from "../../app/assets/about-us/aboutUs/about-tick-icon.png";

const checklist = [
  "Comprehensive Coverage",
  "Customer-Centric Approach",
  "Commitment to Excellence",
];

export default function AboutIntro() {
  return (
    <section className="bg-white py-12 lg:py-[100px]">
      <Container className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-5">
        {/* Image collage */}
        <div className="w-full flex-1">
          {/* Mobile/tablet: simple stacked layout, no overlap */}
          <div className="grid grid-cols-2 gap-4 lg:hidden">
            <img
              src={aboutMainImage}
              alt=""
              className="col-span-2 h-56 w-full rounded-2xl object-cover sm:h-72"
            />
            <img
              src={aboutSecondaryImage}
              alt=""
              className="h-40 w-full rounded-2xl border-4 border-white object-cover shadow"
            />
            <div className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-[#ac3e25] p-4 text-center text-white">
              <span className="font-poppins text-3xl font-semibold">27+</span>
              <span className="font-poppins text-xs font-semibold">
                YEARS OF EXPERIENCE
              </span>
            </div>
            <div className="col-span-2 flex items-center gap-4 rounded-2xl bg-white p-4 shadow-lg">
              <img
                src={reviewAvatar}
                alt=""
                className="size-16 shrink-0 rounded-xl border-4 border-[#f6f6f6] object-cover"
              />
              <div className="flex flex-col">
                <span className="font-poppins text-2xl font-semibold text-black">
                  1000k+
                </span>
                <span className="bg-gradient-to-l from-[#ac3e25] to-[#46190f] bg-clip-text font-poppins text-sm font-semibold text-transparent">
                  SATISFIED CLIENTS
                </span>
              </div>
            </div>
          </div>

          {/* Desktop: precise overlapping collage */}
          <div className="relative hidden lg:block lg:h-[560px] lg:max-w-[800px]">
            <img
              src={aboutMainImage}
              alt=""
              className="absolute left-0 top-0 h-[75%] w-[68%] rounded-[23px] object-cover"
            />

            <div className="absolute left-[62%] top-[9.5%] flex h-[29.5%] w-[25.5%] flex-col items-center justify-center gap-1 rounded-[23px] border-[12px] border-white bg-[#ac3e25] text-center text-white">
              <span className="font-poppins text-4xl font-semibold">27+</span>
              <span className="font-poppins text-sm font-semibold leading-tight">
                YEARS OF
                <br />
                EXPERIENCE
              </span>
            </div>

            <img
              src={aboutSecondaryImage}
              alt=""
              className="absolute left-[49%] top-[49%] h-[56.5%] w-[51%] rounded-[24px] border-[12px] border-white object-cover"
            />

            <div className="absolute left-[8%] top-[78.5%] flex w-[57%] items-center gap-5 rounded-[26px] bg-white p-4 shadow-xl">
              <img
                src={reviewAvatar}
                alt=""
                className="size-[100px] shrink-0 rounded-2xl border-4 border-[#f6f6f6] object-cover"
              />
              <div className="flex flex-col">
                <span className="font-poppins text-3xl font-semibold text-black">
                  1000k+
                </span>
                <span className="bg-gradient-to-l from-[#ac3e25] to-[#46190f] bg-clip-text font-poppins text-lg font-semibold text-transparent">
                  SATISFIED CLIENTS
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Text content */}
        <div className="flex w-full flex-1 flex-col gap-5">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-gradient-to-l from-[#ac3e25] to-[#46190f]" />
              <span className="bg-gradient-to-l from-[#ac3e25] to-[#46190f] bg-clip-text font-poppins text-sm font-semibold uppercase text-transparent">
                About Us
              </span>
            </div>

            <h2 className="font-poppins text-3xl font-bold text-black sm:text-4xl lg:text-[45px] lg:leading-[50px]">
              We're Providing Best Insurance Policy's
            </h2>

            <p className="text-justify font-poppins text-base leading-6 text-black/70">
              Purabi General Insurance Company Limited (PGICL),{" "}
              <strong className="font-bold text-black/70">
                established on June 29, 1998
              </strong>
              , is a leading insurer in Bangladesh, providing comprehensive
              general insurance services. Licensed under the Insurance Act,
              1938, PGICL offers a wide range of protection beyond life
              insurance, ensuring your peace of mind with reliable and
              innovative solutions.
            </p>
          </div>

          <div className="flex flex-col gap-4 rounded-[20px] bg-[#f6f6f6] p-5 sm:flex-row">
            <div className="flex flex-1 flex-col gap-6">
              <div className="flex items-center gap-3">
                <span className="flex size-[70px] shrink-0 items-center justify-center rounded-[10px] bg-[#ac3e25]">
                  <img src={barChartIcon} alt="" className="size-7" />
                </span>
                <div className="flex flex-col">
                  <span className="font-poppins text-4xl font-semibold text-black">
                    90%
                  </span>
                  <span className="font-poppins text-sm font-semibold text-[#737092]">
                    SUCCESS RATE
                  </span>
                </div>
              </div>

              <ul className="flex flex-col gap-1.5 rounded-[10px] bg-white p-2.5">
                {checklist.map((item) => (
                  <li key={item} className="flex items-center gap-1.5">
                    <img src={tickIcon} alt="" className="size-3.5" />
                    <span className="font-poppins text-base text-[#ac3e25]/70">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <img
              src={successRateImage}
              alt=""
              className="h-[200px] w-full flex-1 rounded-[20px] object-cover sm:h-auto"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
