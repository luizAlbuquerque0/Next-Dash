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

interface IRegisterFormProps {
  registerAction: (formData: FormData) => Promise<void>;
}

export function RegisterForm({ registerAction }: IRegisterFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>
          Create you account to access the plataform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={registerAction}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="your name"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="****"
                required
              />
            </div>

            <div className="flex flex-col gap-3">
              <Button type="submit" className="w-full">
                Create account
              </Button>
            </div>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?
            <a href="/login" className="underline underline-offset-4">
              Sign in
            </a>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
