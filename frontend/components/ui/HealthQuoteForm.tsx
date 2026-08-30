import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Button from "./Button";
import selfIcon from "../../app/assets/health-insurance/for-self-icon2.svg";
import coupleIcon from "../../app/assets/health-insurance/couples-icon.svg";
import familyIcon from "../../app/assets/health-insurance/family-icon.svg";
import parentsIcon from "../../app/assets/health-insurance/parents-icon.svg";

type CoverageType = "self" | "couple" | "family" | "parents";

const ageOptions = [
  "18 - 25",
  "26 - 35",
  "36 - 45",
  "46 - 55",
  "56 - 65",
  "66+",
];

const coverageOptions = [
  { value: "all", label: "Show all plan" },
  { value: "1-lac", label: "Up to 1 lac" },
  { value: "1-to-5-lac", label: "1 Lac to 5 Lac" },
  { value: "5-to-10-lac", label: "5 lac to 10 lac" },
];

const coverageTypes = [
  { id: "self", label: "For Self", icon: selfIcon },
  { id: "couple", label: "For Couple", icon: coupleIcon },
  { id: "family", label: "For Family", icon: familyIcon },
  { id: "parents", label: "For Parents", icon: parentsIcon },
] as const;

interface QuoteFieldProps {
  label: string;
  placeholder?: string;
  type?: "text" | "tel";
  select?: boolean;
}

function QuoteField({
  label,
  placeholder = "Select",
  type = "text",
  select = false,
}: QuoteFieldProps) {
  const fieldClassName =
    "h-[50px] w-full rounded-[5px] border border-black/20 bg-[#444]/5 px-5 font-poppins text-sm text-[#444] outline-none transition-colors focus:border-[#ac3e25] sm:px-7 sm:text-base";

  return (
    <label className="flex w-full flex-col gap-3">
      <span className="font-poppins text-sm font-medium text-[#444]/50 sm:text-base">
        {label}
      </span>

      {select ? (
        <select defaultValue="" className={fieldClassName}>
          <option value="" disabled>
            {placeholder}
          </option>
          {ageOptions.map((age) => (
            <option key={age} value={age}>
              {age}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className={fieldClassName}
        />
      )}
    </label>
  );
}

interface ChoiceGroupProps {
  label: string;
  options: Array<{ value: string; label: string }>;
  selectedValue: string;
  onChange: (value: string) => void;
  compact?: boolean;
}

function ChoiceGroup({
  label,
  options,
  selectedValue,
  onChange,
  compact = false,
}: ChoiceGroupProps) {
  return (
    <div className="flex w-full flex-col gap-3">
      <p className="font-poppins text-sm font-medium text-[#444]/50 sm:text-base">
        {label}
      </p>

      <div
        className={
          compact
            ? "grid max-w-[310px] grid-cols-2 gap-4"
            : "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
        }
      >
        {options.map((option) => {
          const isActive = selectedValue === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`h-12 rounded-[5px] border font-poppins text-sm transition-colors sm:text-base ${
                isActive
                  ? "border-[#ac3e25]/30 bg-[#ac3e25]/20 text-[#ac3e25]"
                  : "border-black/15 bg-[#444]/5 text-black"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function HealthQuoteForm() {
  const [coverageType, setCoverageType] = useState<CoverageType>("self");
  const [coverageAmount, setCoverageAmount] = useState("all");
  const [childCount, setChildCount] = useState("1");
  const [parentSelection, setParentSelection] = useState("both");
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);

  const showSpouseAge = coverageType === "couple" || coverageType === "family";
  const isFamily = coverageType === "family";
  const isParents = coverageType === "parents";

  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      className="flex w-full flex-col gap-7 rounded-[20px] border border-black/10 bg-white p-5 shadow-[2px_2px_10px_rgba(0,0,0,0.25)] sm:p-8 lg:p-[50px]"
    >
      <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
        {coverageTypes.map((type) => {
          const isActive = coverageType === type.id;

          return (
            <button
              key={type.id}
              type="button"
              onClick={() => setCoverageType(type.id)}
              className="flex w-[88px] flex-col items-center gap-1.5"
            >
              <span
                className={`flex size-16 items-center justify-center rounded-full sm:size-20 ${
                  isActive ? "bg-[#ac3e25]" : "bg-[#ac3e25]/10"
                }`}
              >
                <img
                  src={type.icon}
                  alt=""
                  className={`size-9 object-contain sm:size-10 ${
                    isActive ? "brightness-0 invert" : ""
                  }`}
                />
              </span>

              <span
                className={`font-poppins text-sm font-medium ${
                  isActive ? "text-[#ac3e25]" : "text-[#444]/50"
                }`}
              >
                {type.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <QuoteField label="Name" placeholder="Enter Your Full Name" />
        <QuoteField
          label="Mobile Number"
          type="tel"
          placeholder="Enter Your Phone Number"
        />

        {!isParents && (
          <>
            <QuoteField label="Your Age" select />

            {showSpouseAge && <QuoteField label="Spouse's Age" select />}
          </>
        )}
      </div>

      {isParents && (
        <>
          <ChoiceGroup
            label="Insurance For"
            selectedValue={parentSelection}
            onChange={setParentSelection}
            compact
            options={[
              { value: "both", label: "Both" },
              { value: "father", label: "Father" },
              { value: "mother", label: "Mother" },
            ]}
          />

          <div className="grid gap-5 md:grid-cols-2">
            <QuoteField label="Fathers Age" select />
            <QuoteField label="Mothers Age" select />
          </div>
        </>
      )}

      {isFamily && (
        <ChoiceGroup
          label="Number of Child (Below 18 years)"
          selectedValue={childCount}
          onChange={setChildCount}
          compact
          options={[
            { value: "1", label: "1 Child" },
            { value: "2", label: "2 Child" },
          ]}
        />
      )}

      <ChoiceGroup
        label="Health Coverage Amount (৳)"
        options={coverageOptions}
        selectedValue={coverageAmount}
        onChange={setCoverageAmount}
      />

      <label className="flex cursor-pointer items-center gap-3 font-poppins text-sm text-black sm:text-base">
        <input
          type="checkbox"
          checked={hasAcceptedTerms}
          onChange={(event) => setHasAcceptedTerms(event.target.checked)}
          className="size-5 accent-[#ac3e25]"
        />
        <span>
          I agree with the{" "}
          <a href="/terms" className="font-semibold text-[#ac3e25] underline">
            Terms of Service
          </a>
        </span>
      </label>

      <Button
        type="submit"
        disabled={!hasAcceptedTerms}
        variant="primary"
        size="lg"
        fullWidth
        icon={<ArrowUpRight size={22} />}
        iconPosition="right"
        className="mt-2 py-3.5"
      >
        See Plans
      </Button>
    </form>
  );
}
