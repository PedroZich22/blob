"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Search, Bell, Settings, User, LucideIcon } from "lucide-react";

import { NavUser } from "./nav-user";
import { useCurrentUser } from "@/hooks/use-current-user";
import { CreatePost } from "./create-post";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

type SidebarNavItem = {
  href: string;
  title: string;
  icon: LucideIcon;
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
      href: `/profile/${user?.id}`,
    },
    {
      title: "Configurações",
      icon: Settings,
      href: "/settings",
    },
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavUser />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    size="lg"
                    isActive={pathname === item.href}
                    asChild
                  >
                    <Link href={item.href}>
                      <item.icon className="size-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <SidebarGroup>
              <CreatePost />
            </SidebarGroup>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
