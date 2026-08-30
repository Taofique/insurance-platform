import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Container from "../shared/Container";
import Button from "../ui/Button";
import CategoryCard from "../ui/CategoryCard";
import categories from "../../app/data/categories.json";

const categoryImages = import.meta.glob(
  "../../app/assets/insurance-categories/*.png",
  {
    eager: true,
    import: "default",
  },
) as Record<string, string>;

export default function Categories() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="bg-white py-12 lg:py-[50px]">
      <Container className="flex flex-col items-center gap-10 lg:gap-[60px]">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="font-poppins text-3xl font-semibold uppercase sm:text-4xl lg:text-[45px]">
            Categories of Insurance
          </h2>
          <p className="font-poppins text-sm text-black/70 lg:max-w-[1280px]">
            At SIPLC, we exceed customer expectations by being available both
            physically and virtually on their preferred channels. As a leading
            general insurer in Bangladesh, we are committed to continuous
            development and improvement, ensuring every citizen can access
            insurance benefits without hindrance
          </p>
        </div>

        <div className="w-full">
          <div className="overflow-hidden pt-10 pb-8" ref={emblaRef}>
            <div className="flex cursor-grab gap-6 active:cursor-grabbing">
              {categories.map((category) => (
                <div
                  key={category.title}
                  className="min-w-0 shrink-0 basis-[85%] sm:basis-[45%] lg:basis-[31%]"
                >
                  <CategoryCard
                    title={category.title}
                    description={category.description}
                    image={
                      categoryImages[
                        `../../app/assets/insurance-categories/${category.image}`
                      ]
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canScrollPrev}
              aria-label="Previous categories"
              className="flex size-10 items-center justify-center rounded-full border border-[#ac3e25]/30 text-[#ac3e25] transition-opacity disabled:opacity-30"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canScrollNext}
              aria-label="Next categories"
              className="flex size-10 items-center justify-center rounded-full border border-[#ac3e25]/30 text-[#ac3e25] transition-opacity disabled:opacity-30"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <Button
          href="/insurance"
          variant="primary"
          size="lg"
          icon={<ArrowUpRight size={20} />}
          iconPosition="right"
        >
          See More
        </Button>
      </Container>
    </section>
  );
}
