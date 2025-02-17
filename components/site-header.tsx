"use client";

import { useRouter } from "next/navigation";
import { Logo } from "./logo";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";

export function SiteHeader() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-10 p-2 backdrop-blur-sm bg-background/80 flex items-center justify-center">
      <div className="flex justify-center items-center gap-2 absolute left-0 ml-4">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-6" />
        <Button onClick={() => router.back()} variant="ghost" size="icon">
          <ArrowLeft className="size-4" />
        </Button>
      </div>

      <Logo />
    </header>
  );
}
