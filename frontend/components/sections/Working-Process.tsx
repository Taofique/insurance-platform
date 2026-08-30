import Container from "../shared/Container";
import background from "../../app/assets/working-process/background.png";
import processOne from "../../app/assets/working-process/process-1.jpg.png";
import processTwo from "../../app/assets/working-process/process-2.jpg.png";
import processThree from "../../app/assets/working-process/process-3.jpg.png";

const processSteps = [
  {
    number: "01",
    title: "Get A Quotation",
    description:
      "Answer a couple of questions, we'll provide accurate live quotes.",
    image: processOne,
  },
  {
    number: "02",
    title: "Complete The Application",
    description:
      "Answer a couple of questions, we'll provide accurate live quotes.",
    image: processTwo,
  },
  {
    number: "03",
    title: "Get Your Insurance",
    description:
      "Answer a couple of questions, we'll provide accurate live quotes.",
    image: processThree,
  },
];

export default function WorkingProcess() {
  return (
    <section className="relative overflow-hidden bg-black py-12 sm:py-16 lg:py-20">
      <img
        src={background}
        alt=""
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-black/20" />

      <Container className="relative">
        <div className="rounded-[20px] border border-white/50 bg-gradient-to-t from-[#ac3e25]/10 to-white/0 px-5 py-10 backdrop-blur-[20px] sm:px-10 sm:py-14 lg:px-20 lg:py-20">
          <div className="mx-auto flex max-w-[825px] flex-col items-center gap-3 text-center">
            <div className="flex items-center gap-1">
              <span className="h-px w-8 bg-white sm:w-10" />
              <p className="font-poppins text-sm font-semibold text-white sm:text-base">
                INSURANCE SIMPLIFIED
              </p>
              <span className="h-px w-8 bg-white sm:w-10" />
            </div>

            <h2 className="font-poppins text-3xl font-bold uppercase text-white sm:text-4xl lg:text-[45px]">
              Our Working Process
            </h2>

            <p className="font-poppins text-sm leading-6 text-white sm:text-base">
              Our process makes insurance simple and stress-free, from
              personalized consultations and tailored solutions to swift
              activation and ongoing support. We ensure reliable protection and
              hassle-free claims every step of the way.
            </p>
          </div>

          <div className="mt-10 grid gap-12 sm:grid-cols-2 lg:mt-[50px] lg:grid-cols-3 lg:gap-20">
            {processSteps.map((step) => (
              <article
                key={step.number}
                className="mx-auto flex max-w-[360px] flex-col items-center gap-6 text-center"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="flex size-[190px] items-center justify-center rounded-full border border-white sm:size-[208px]">
                    <img
                      src={step.image}
                      alt=""
                      className="size-[152px] rounded-full object-cover sm:size-[167px]"
                    />
                  </div>

                  <span className="flex size-14 items-center justify-center rounded-full bg-[#ac3e25] font-poppins text-xl font-semibold text-white shadow-[inset_-1px_1px_4px_rgba(0,0,0,0.15)]">
                    {step.number}
                  </span>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <h3 className="font-poppins text-xl font-semibold text-white sm:text-[22px]">
                    {step.title}
                  </h3>
                  <p className="max-w-[300px] font-poppins text-sm leading-6 text-white sm:text-base">
                    {step.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
