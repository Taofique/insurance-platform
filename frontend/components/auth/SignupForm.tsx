import { ArrowUpRight } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import Button from "../ui/Button";

export default function SignupForm() {
  return (
    <form className="flex w-full flex-col gap-[30px]">
      <div className="flex flex-col gap-5">
        <div className="flex w-full">
          <span className="flex items-center rounded-l-[5px] border border-[#ac3e25]/20 bg-black/[0.03] px-5 py-5 font-poppins text-base text-black">
            +880
          </span>
          <input
            type="tel"
            placeholder="Enter Your Mobile number"
            className="w-full rounded-r-[5px] border border-l-0 border-[#ac3e25]/20 bg-black/[0.03] px-5 py-5 font-poppins text-base text-black placeholder:text-black/70"
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          icon={<ArrowUpRight size={20} />}
          fullWidth
        >
          Send OTP
        </Button>
      </div>

      <div className="flex items-center gap-5">
        <span className="h-px flex-1 bg-[#ac3e25]" />
        <span className="font-poppins text-sm font-semibold text-black">
          OR
        </span>
        <span className="h-px flex-1 bg-[#ac3e25]" />
      </div>

      <div className="flex w-full">
        <span className="flex items-center rounded-l-[5px] border border-[#4285f4]/50 bg-white px-5 py-3.5">
          <FaGoogle size={22} className="text-[#4285f4]" />
        </span>
        <button
          type="button"
          className="flex flex-1 items-center justify-center rounded-r-[5px] border border-[#ac3e25]/20 bg-[#4285f4] py-3.5 font-poppins text-base text-white"
        >
          Continue with Google
        </button>
      </div>
    </form>
  );
}
