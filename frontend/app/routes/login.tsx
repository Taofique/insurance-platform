import AuthLayout from "../../layouts/AuthLayout";
import LoginForm from "../../components/auth/LoginForm";

export default function Login() {
  return (
    <AuthLayout
      heading="Welcome Back"
      subheading="Don't Share your Login Credential"
    >
      <LoginForm />
    </AuthLayout>
  );
}
