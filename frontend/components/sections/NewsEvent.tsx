import Container from "../shared/Container";
import NewsEventCard from "../ui/NewsEventCard";
import newsEvents from "../../app/data/news-events.json";

const newsImages = import.meta.glob("../../app/assets/news-events/*.png", {
  eager: true,
  import: "default",
}) as Record<string, string>;

export default function NewsEvents() {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-[100px]">
      <Container className="flex flex-col items-center gap-8 lg:gap-[30px]">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-1">
            <span className="h-px w-8 bg-[#ac3e25] sm:w-10" />
            <p className="font-poppins text-sm font-semibold uppercase text-[#ac3e25] sm:text-base">
              News & Events
            </p>
            <span className="h-px w-8 bg-[#ac3e25] sm:w-10" />
          </div>

          <h2 className="mt-2 font-poppins text-3xl font-bold uppercase text-black sm:text-4xl lg:text-[45px]">
            Stay Updated with the Latest Happenings
          </h2>

          <p className="mt-2 font-poppins text-sm text-black/70 sm:text-base">
            Stay updated with our latest news, events, and initiatives at Purabi
            General Insurance. Join us in protecting your future!
          </p>
        </div>

        <div className="grid w-full gap-5 md:grid-cols-2 xl:grid-cols-3">
          {newsEvents.map((newsEvent) => (
            <NewsEventCard
              key={`${newsEvent.date}-${newsEvent.title}`}
              image={
                newsImages[`../../app/assets/news-events/${newsEvent.image}`]
              }
              title={newsEvent.title}
              date={newsEvent.date}
              description={newsEvent.description}
              href={newsEvent.href}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
