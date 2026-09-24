import { useState, type SyntheticEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router";
import { useAuth } from "../../app/context/AuthContext";
import { getDashboardPath } from "../../app/roles";
import Button from "../ui/Button";

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      const user = await login({
        email,
        password,
      });

      navigate(getDashboardPath(user.role), { replace: true });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";

      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-2.5">
        <label htmlFor="email" className="font-poppins text-base text-black">
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter Your Email"
          required
          className="w-full rounded-[5px] border border-[#ac3e25]/20 bg-black/[0.03] px-5 py-5 font-poppins text-base text-black placeholder:text-black/70"
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <label htmlFor="password" className="font-poppins text-base text-black">
          Password
        </label>

        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter Your Password"
          required
          className="w-full rounded-[5px] border border-[#ac3e25]/20 bg-black/[0.03] px-5 py-5 font-poppins text-base text-black placeholder:text-black/70"
        />
      </div>

      {error && (
        <p role="alert" className="font-poppins text-sm text-red-600">
          {error}
        </p>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        icon={<ArrowUpRight size={20} />}
        fullWidth
        disabled={isLoading}
      >
        {isLoading ? "Logging In..." : "Log In"}
      </Button>
    </form>
  );
}
