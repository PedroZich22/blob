"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Home,
  Search,
  Bell,
  Settings,
  User,
  Menu,
  LucideIcon,
} from "lucide-react";

import { UserAvatar } from "./user-avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCurrentUser } from "@/hooks/use-current-user";

type SidebarNavItem = {
  href: string;
  title: string;
  icon: LucideIcon;
};

export function AppSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const user = useCurrentUser();

  const navigationItems: SidebarNavItem[] = [
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
      href: `/profile/${user?.name}`,
    },
    {
      title: "Configurações",
      icon: Settings,
      href: "/settings",
    },
  ];

  const NavContent = () => (
    <div className="flex h-full flex-col gap-4 p-4 bg-background">
      <div className="flex items-center justify-between p-2 border border-border rounded-lg">
        <UserAvatar />
      </div>
      <nav className="flex flex-col gap-2 px-2">
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setIsOpen(false)}
            className={cn(
              "flex items-center gap-4 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300",
              "hover:bg-foreground/10",
              pathname === item.href
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
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

      <div className="hidden lg:block sticky top-0 h-screen w-[300px] border-r border-border/40">
        <NavContent />
      </div>
    </>
  );
}
