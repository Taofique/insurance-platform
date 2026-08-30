import Container from "../shared/Container";
import HealthQuoteForm from "../ui/HealthQuoteForm";
import illustration from "../../app/assets/health-insurance/left-Animated-Image.png";

export default function HealthInsuranceQuote() {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-[80px]">
      <Container>
        <div className="flex flex-col items-end gap-10 xl:flex-row xl:gap-[50px]">
          <div className="flex w-full justify-center xl:w-[500px] xl:shrink-0">
            <img
              src={illustration}
              alt="Health insurance consultation"
              className="w-full max-w-[500px] object-contain"
            />
          </div>

          <HealthQuoteForm />
        </div>
      </Container>
    </section>
  );
}
