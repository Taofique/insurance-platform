import { Play } from "lucide-react";
import Container from "../shared/Container";
import Button from "../ui/Button";
import heroImage from "../../app/assets/hero-image.png";

export default function Hero() {
  return (
    <section className="relative flex min-h-[380px] items-center overflow-hidden py-16 sm:min-h-[500px] lg:min-h-[750px] lg:py-0">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 size-full object-cover object-[75%_center] sm:object-center"
        />
      </div>

      <Container className="relative">
        <div className="flex max-w-[600px] flex-col items-start gap-6 lg:max-w-[1000px] lg:gap-[50px]">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 sm:gap-5">
              <span className="h-px w-8 bg-white sm:w-[52px]" />
              <p className="font-poppins text-sm font-semibold text-white sm:text-base lg:text-xl">
                Protecting Value Through Innovation
              </p>
            </div>

            <h1 className="font-poppins text-3xl font-medium text-white sm:text-4xl lg:max-w-[1000px] lg:text-[60px]">
              Leading Insurance Solutions for Your Peace of Mind
            </h1>

            <p className="font-poppins text-sm text-white/90 sm:text-base lg:max-w-[880px] lg:text-xl">
              Purabi General Insurance Company Limited (PGICL), established in
              1988, is a leading insurer in Bangladesh, providing comprehensive
              asset protection for corporate organizations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 sm:gap-10">
            <Button href="/get-a-quote" variant="primary" size="lg">
              Discover More
            </Button>

            <a href="#video" className="group flex items-center gap-3">
              <span className="flex size-12 items-center justify-center rounded-full border-2 border-white transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-white/20 sm:size-16">
                <Play
                  size={20}
                  className="fill-white text-white transition-transform duration-300 ease-out group-hover:scale-110"
                />
              </span>
              <span className="font-poppins text-sm font-bold text-white uppercase transition-transform duration-300 group-hover:translate-x-1 sm:text-lg">
                Watch Video
              </span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
