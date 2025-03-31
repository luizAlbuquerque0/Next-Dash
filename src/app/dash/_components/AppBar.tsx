"use client";
import { Button } from "@/components/ui/button";
import { signOutAction } from "../_actions/signOutAction";
import { signIn, useSession } from "next-auth/react";

export function AppBar() {
  const session = useSession();

  if (session.status === "loading") {
    return "Carregando...";
  }

  return (
    <div className="h-20 flex justify-between border-b items-center px-6">
      <span>Olá, {session.data?.user?.name}</span>
      <div className="space-x-4">
        <Button size="sm" variant="outline" onClick={() => signIn("google")}>
          Conectar Google
        </Button>
        <Button size="sm" onClick={signOutAction}>
          Sair
        </Button>
      </div>
    </div>
  );
}
