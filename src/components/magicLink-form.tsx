"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState, useState } from "react";
import { ChevronLeftIcon, Loader2, Wand2Icon } from "lucide-react";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { loginAction, MagicLinkAction } from "@/app/login/actions";

type ActionState = { error: string } | null | void;

export function LoginForm() {
  const [isMagicLink, setIsMagikLink] = useState(false);
  const [, dispatchAction, isPedding] = useActionState(
    async (_previousData: any, formData: FormData) => {
      const response = await (isMagicLink
        ? MagicLinkAction(formData)
        : loginAction(formData));

      if (response?.error) {
        toast.error(response.error);
      }
    },
    null
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={dispatchAction}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
              />
            </div>
            {!isMagicLink && (
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required name="password" />
              </div>
            )}
            <div className="flex flex-col gap-3">
              <Button type="submit" className="w-full" disabled={isPedding}>
                {isPedding && <Loader2 className="animate-spin" />}
                Login
              </Button>
              {!isMagicLink && (
                <Button
                  variant="outline"
                  type="button"
                  className="w-full"
                  disabled={isPedding}
                  onClick={() => signIn("google")}
                >
                  Login with Google
                </Button>
              )}
              <Button
                variant="outline"
                type="button"
                className="w-full"
                disabled={isPedding}
                onClick={(prev) => setIsMagikLink(!prev)}
              >
                {isMagicLink ? <ChevronLeftIcon /> : <Wand2Icon />}
                {isMagicLink ? "Voltar" : "Login with Magic Link"}
              </Button>
            </div>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <a href="/register" className="underline underline-offset-4">
              Sign up
            </a>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
