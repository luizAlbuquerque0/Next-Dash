import { LoginForm } from "@/components/magicLink-form";
import { signIn } from "@/lib/auth";
import { loginSchema } from "@/schemas/loginSchema";
import { magicLinkSchema } from "@/schemas/magicLinkSchema";
import { AuthError, CredentialsSignin } from "next-auth";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
