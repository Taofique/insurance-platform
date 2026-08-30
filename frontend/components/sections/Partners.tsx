import Container from "../shared/Container";
import acme from "../../app/assets/partners/acme.png";
import doreen from "../../app/assets/partners/doreen.png";
import general from "../../app/assets/partners/general.png";
import healthcare from "../../app/assets/partners/healthcare.png";
import incepta from "../../app/assets/partners/incepta.png";
import palmal from "../../app/assets/partners/palmal.png";
import walton from "../../app/assets/partners/walton.png";

const partners = [
  { name: "Acme", logo: acme },
  { name: "Doreen", logo: doreen },
  { name: "General", logo: general },
  { name: "Healthcare", logo: healthcare },
  { name: "Incepta", logo: incepta },
  { name: "Palmal", logo: palmal },
  { name: "Walton", logo: walton },
];

export default function Partners() {
  const repeatedPartners = [...partners, ...partners];

  return (
    <section className="overflow-hidden border-t border-[#b6b6b6]/12 bg-white py-12 sm:py-16 lg:py-[50px]">
      <Container className="flex flex-col items-center gap-8 lg:gap-[50px]">
        <h2 className="text-center font-poppins text-2xl font-normal uppercase text-black sm:text-3xl lg:text-[35px]">
          Our Genuine Trusted Partners & Clients
        </h2>

        <div className="w-full overflow-hidden border border-black/20">
          <div className="partner-marquee flex w-max">
            {repeatedPartners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex h-[120px] w-[160px] shrink-0 items-center justify-center border-r border-[#444]/50 bg-white px-4 py-4 sm:h-[135px] sm:w-[175px] lg:h-[150px] lg:w-[183px] lg:px-6 lg:py-[18px]"
              >
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className="h-[75px] w-[120px] object-contain sm:h-[85px] sm:w-[140px] lg:h-[95px] lg:w-[150px]"
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
