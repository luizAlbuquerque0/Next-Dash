import { UserRole } from "@prisma/client";
import { Component } from "lucide-react";
import { auth } from "./auth";
import { redirect } from "next/navigation";

export function withRoleGuard(
  component: React.ComponentType<any>,
  requiredRole: UserRole
) {
  return async function RoleGuardComponent(props: any) {
    const session = await auth();
    if (session?.user.role !== requiredRole) {
      redirect("/dash");
    }
    return <Component {...props} />;
  };
}
