"use client";

import {
  Home,
  Search,
  Settings,
  User,
  LucideIcon,
  Bookmark,
} from "lucide-react";

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
} from "../ui/sidebar";
import { Button } from "../ui/button";
import Link from "next/link";
import { NavUser } from "./nav-user";
import { useCurrentUser } from "@/hooks/use-current-user";
import { usePathname } from "next/navigation";

export type SidebarNavItem = {
  href: string;
  title: string;
  icon: LucideIcon;
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const currentUser = useCurrentUser();
  const pathname = usePathname();

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
      title: "Salvos",
      icon: Bookmark,
      href: "/bookmarks",
    },
    {
      title: "Perfil",
      icon: User,
      href: `/profile/${currentUser?.id}`,
    },
    {
      title: "Configurações",
      icon: Settings,
      href: "/settings",
    },
  ];

  return (
    <Sidebar {...props} collapsible="icon">
      <SidebarHeader>
        {!currentUser ? (
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <Button variant="shine" className="w-full" asChild>
                    <Link href={"auth/login"}>Entrar no Blob!</Link>
                  </Button>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ) : (
          <NavUser user={currentUser} />
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem>
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
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <CreatePost />
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
