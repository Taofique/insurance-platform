import { ArrowUpRight } from "lucide-react";

interface CategoryCardProps {
  title: string;
  description: string;
  image: string;
}

// Inline SVG Data URI: uses precise paths with smooth inverse fillet curves
// Independent of card dimensions (anchored to bottom center)
const notchMask = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' preserveAspectRatio='none'><mask id='m'><rect width='100%' height='100%' fill='white'/><path d='M 0 100% L 100% 100% L 100% 0 L 0 0 Z' fill='white'/><path d='M calc(50% - 36px) 100% C calc(50% - 24px) 100%, calc(50% - 28px) calc(100% - 28px), 50% calc(100% - 28px) C calc(50% + 28px) calc(100% - 28px), calc(50% + 24px) 100%, calc(50% + 36px) 100% Z' fill='black'/></mask><rect width='100%' height='100%' fill='black' mask='url(%23m)'/></svg>")`;

// Fallback CSS path mask method (modern browsers)
const cssNotchMask = `radial-gradient(circle 30px at 50% 100%, transparent 98%, black 100%)`;

export default function CategoryCard({
  title,
  description,
  image,
}: CategoryCardProps) {
  return (
    <div className="relative flex h-full flex-col">
      {/* Masked Card Shell */}
      <div
        className="flex flex-1 flex-col items-center rounded-[24px] bg-[#f7ece9] px-6 pt-6 pb-14 text-center"
        style={{
          maskImage: cssNotchMask,
          WebkitMaskImage: cssNotchMask,
        }}
      >
        <img
          src={image}
          alt=""
          className="size-20 shrink-0 object-contain sm:size-24"
        />
        <h3 className="mt-4 font-poppins text-base font-bold uppercase tracking-wide text-black">
          {title}
        </h3>
        <p className="mt-2 flex-1 font-poppins text-xs leading-relaxed text-black/70">
          {description}
        </p>
      </div>

      {/* Button: Fixed at absolute bottom center regardless of card height */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2/4">
        <button
          type="button"
          aria-label={title}
          className="flex size-12 items-center justify-center rounded-full bg-[#ac3e25] text-white shadow-md transition-transform duration-300 hover:scale-110"
        >
          <ArrowUpRight size={22} strokeWidth={2.2} />
        </button>
      </div>
    </div>
  );
}
