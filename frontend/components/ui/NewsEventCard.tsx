import { Clock } from "lucide-react";
import Button from "./Button";

interface NewsEventCardProps {
  image: string;
  title: string;
  date: string;
  description: string;
  href: string;
}

export default function NewsEventCard({
  image,
  title,
  date,
  description,
  href,
}: NewsEventCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-[20px] bg-white p-[10px] shadow-[0_0_5px_rgba(0,0,0,0.15)] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.25)]">
      <div className="relative overflow-hidden rounded-[10px]">
        <img
          src={image}
          alt=""
          className="h-[220px] w-full rounded-[10px] object-cover transition-transform duration-500 ease-out group-hover:scale-105 sm:h-[250px]"
        />
        {/* Optional overlay gradient for extra polish */}
        <div className="absolute inset-0 rounded-[10px] bg-gradient-to-t from-black/0 via-black/0 to-black/0 transition-all duration-300 group-hover:from-black/10 group-hover:via-black/5 group-hover:to-transparent" />
      </div>

      <div className="flex flex-1 flex-col items-start gap-4 p-[10px]">
        <div className="w-full">
          <div className="flex items-center gap-[5px] py-2.5">
            <Clock
              size={12}
              className="text-[#444] transition-colors group-hover:text-blue-600"
            />
            <time className="font-poppins text-[10px] text-[#444] transition-colors group-hover:text-blue-600">
              {date}
            </time>
          </div>

          <h3 className="font-poppins text-xl font-semibold text-black transition-colors group-hover:text-blue-700 sm:text-[22px]">
            {title}
          </h3>

          <div className="my-3 h-px w-full bg-black/20 transition-all group-hover:w-full group-hover:bg-blue-300" />

          <p className="line-clamp-2 font-poppins text-sm leading-6 text-black transition-colors group-hover:text-gray-800 sm:text-base">
            {description}
          </p>
        </div>

        <Button
          href={href}
          variant="primary"
          size="lg"
          className="mt-auto px-8 py-2.5 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg lg:px-[50px] lg:py-[10px]"
        >
          Read More
        </Button>
      </div>
    </article>
  );
}
