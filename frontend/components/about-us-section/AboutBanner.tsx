import Container from "../shared/Container";
import banner from "../../app/assets/about-us-banner.png";

export default function AboutBanner() {
  return (
    <section className="relative flex min-h-[340px] items-center overflow-hidden py-10 sm:min-h-[400px] lg:min-h-[500px] lg:py-[50px]">
      <img
        src={banner}
        alt=""
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />

      <Container className="relative">
        <div className="flex min-h-[230px] flex-col items-start justify-center gap-3 rounded-[10px] bg-white/20 px-5 py-8 backdrop-blur-[5px] sm:min-h-[270px] sm:px-8 sm:py-10 lg:px-[30px]">
          <div className="rounded-full border border-white/50 bg-white/10 px-5 py-2.5 backdrop-blur-[5px] sm:px-[30px]">
            <p className="font-poppins text-xs font-medium capitalize text-white sm:text-sm">
              Home &gt; About Us
            </p>
          </div>

          <h1 className="max-w-[820px] font-poppins text-3xl font-medium capitalize leading-tight text-white sm:text-4xl lg:text-[35px] lg:leading-[60px]">
            Securing Your Future with Confidence
          </h1>

          <p className="max-w-[820px] font-poppins text-sm text-white sm:text-base lg:text-xl">
            Driven by a vision of trust and reliability, we aim not just to sell
            policies, but to build lasting relationships with our
            clients—supporting you through every stage of life.
          </p>
        </div>
      </Container>
    </section>
  );
}
