import Container from "../shared/Container";
import banner from "../../app/assets/Banner.png";

export default function HealthInsuranceBanner() {
  return (
    <section className="relative flex min-h-[340px] items-center overflow-hidden py-10 sm:min-h-[400px] lg:min-h-[500px] lg:py-[50px]">
      <img
        src={banner}
        alt=""
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />

      <Container className="relative">
        <div className="flex min-h-[230px] flex-col items-start justify-center gap-3 rounded-[10px] bg-white/10 px-5 py-8 backdrop-blur-[5px] sm:min-h-[270px] sm:px-8 sm:py-10 lg:px-[30px]">
          <div className="rounded-full border border-white/50 bg-white/10 px-5 py-2.5 backdrop-blur-[5px] sm:px-[30px]">
            <p className="font-poppins text-xs font-medium text-white sm:text-sm">
              Home &gt; Health Insurance
            </p>
          </div>

          <h1 className="max-w-[820px] font-poppins text-3xl font-medium leading-tight text-white sm:text-4xl lg:text-[35px] lg:leading-[60px]">
            Choose The Best{" "}
            <strong className="font-bold">Health Insurance</strong> Plan for
            <br className="hidden sm:block" /> Yourself and your Family
          </h1>
        </div>
      </Container>
    </section>
  );
}
