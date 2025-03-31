'use server'

import { signIn } from "@/lib/auth";
import { loginSchema } from "@/schemas/loginSchema";
import { magicLinkSchema } from "@/schemas/magicLinkSchema";
import { CredentialsSignin, AuthError } from "next-auth";

export async function loginAction(formData: FormData) {
  "use server";
  const { success, data } = loginSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!success) return;

  const { email, password } = data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dash",
    });
  } catch (error) {
    if (error instanceof CredentialsSignin) {
      return { error: "Credenciais invalidas" };
    }
    if (error instanceof AuthError) {
      return { error: "Ocorreu um erro" };
    }

    throw error;
  }
}
export async function MagicLinkAction(formData: FormData) {
  "use server";
  const { success, data } = magicLinkSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!success) return;

  const { email } = data;

  await signIn("credentials", {
    email,
    redirectTo: "/dash",
  });
}