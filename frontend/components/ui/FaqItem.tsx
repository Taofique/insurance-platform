import { ChevronDown } from "lucide-react";

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export default function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
}: FaqItemProps) {
  return (
    <article className="overflow-hidden rounded-[16px] bg-[#f5f5f5]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 p-[14px] text-left"
      >
        <span className="font-poppins text-base font-medium text-[#151515] sm:text-lg">
          {question}
        </span>

        <ChevronDown
          size={20}
          className={`shrink-0 text-[#151515] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="px-6 pb-6 pt-1 sm:px-10">
          <p className="font-poppins text-sm leading-6 text-[#747474] sm:text-base">
            {answer}
          </p>
        </div>
      )}
    </article>
  );
}
