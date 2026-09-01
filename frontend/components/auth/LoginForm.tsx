import { ArrowUpRight } from "lucide-react";
import Button from "../ui/Button";

export default function LoginForm() {
  return (
    <form className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-2.5">
        <label className="font-poppins text-base text-black">
          Username or Agent ID
        </label>
        <input
          type="text"
          placeholder="Enter Your Username or Agent ID"
          className="w-full rounded-[5px] border border-[#ac3e25]/20 bg-black/[0.03] px-5 py-5 font-poppins text-base text-black placeholder:text-black/70"
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <label className="font-poppins text-base text-black">Password</label>
        <input
          type="password"
          placeholder="Enter Your Password"
          className="w-full rounded-[5px] border border-[#ac3e25]/20 bg-black/[0.03] px-5 py-5 font-poppins text-base text-black placeholder:text-black/70"
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        icon={<ArrowUpRight size={20} />}
        fullWidth
      >
        Log In
      </Button>
    </form>
  );
}
