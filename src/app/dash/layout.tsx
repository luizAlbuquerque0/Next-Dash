import { Button } from "@/components/ui/button";
import { AppBar } from "./_components/AppBar";

export default function DashLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AppBar />

      <main>{children}</main>
    </div>
  );
}
