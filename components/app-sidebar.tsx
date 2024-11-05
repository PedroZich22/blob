"use client";

import { Home, Search, Bell, Settings, User, Menu } from "lucide-react";
import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { UserAvatar } from "./user-avatar";
import { ThemeToggle } from "./theme-toggle";
import { useSession } from "next-auth/react";

export function AppSidebar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  const { data: session } = useSession();
  const userData = session?.user;

  const navigationItems = [
    {
      title: "Home",
      icon: Home,
      href: "/",
    },
    {
      title: "Pesquisar",
      icon: Search,
      href: "/search",
    },
    {
      title: "Notificações",
      icon: Bell,
      href: "/notifications",
    },
    {
      title: "Perfil",
      icon: User,
      href: "/profile",
    },
    {
      title: "Configurações",
      icon: Settings,
      href: "/settings",
    },
  ];

  const NavContent = () => (
    <div
      className="flex h-full flex-col gap-4 p-4 bg-gradient-to-b from-cyan-50/90 to-sky-50/90 
                    dark:from-cyan-950/90 dark:to-sky-950/90 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between px-2 py-4">
        {userData ? (
          <UserAvatar user={userData} />
        ) : (
          <Button asChild variant="default">
            <Link href="/login">Entrar</Link>
          </Button>
        )}
        <ThemeToggle />
      </div>
      <nav className="flex flex-col gap-2 px-2">
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setIsOpen(false)}
            className={cn(
              "flex items-center gap-4 rounded-full px-4 py-3 text-sm font-medium transition-all duration-300",
              "hover:bg-cyan-100/50 dark:hover:bg-cyan-900/50",
              pathname === item.href
                ? "bg-gradient-to-r from-cyan-500 to-sky-500 text-white"
                : "text-muted-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>
    </div>
  );

  return (
    <>
      {/* Versão Mobile */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed left-4 top-4 z-40 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] p-0">
          <NavContent />
        </SheetContent>
      </Sheet>

      {/* Versão Desktop */}
      <div className="hidden lg:block sticky top-0 h-screen w-[300px] border-r">
        <NavContent />
      </div>
    </>
  );
}
