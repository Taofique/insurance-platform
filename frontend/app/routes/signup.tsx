import AuthLayout from "../../layouts/AuthLayout";
import SignupForm from "../../components/auth/SignupForm";

export default function Signup() {
  return (
    <AuthLayout
      heading="Create Account"
      subheading="Don't Share your Login Credential"
    >
      <SignupForm />
    </AuthLayout>
  );
}
