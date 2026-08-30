import { useState } from "react";
import Container from "../shared/Container";
import FaqItem from "../ui/FaqItem";
import faqs from "../../app/data/health-insurance-faqs.json";

export default function HealthInsuranceFaq() {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const handleToggle = (question: string) => {
    setOpenQuestion((currentQuestion) =>
      currentQuestion === question ? null : question,
    );
  };

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-[50px]">
      <Container className="flex flex-col items-center gap-8 lg:gap-[50px]">
        <h2 className="font-poppins text-3xl font-semibold tracking-[-1.344px] text-[#151515] sm:text-4xl lg:text-[45px] lg:leading-[64px]">
          Frequently asked questions
        </h2>

        <div className="flex w-full max-w-[792px] flex-col gap-3">
          {faqs.map((faq) => (
            <FaqItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              isOpen={openQuestion === faq.question}
              onToggle={() => handleToggle(faq.question)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
