"use client";

import {
  Home,
  Search,
  Settings,
  User,
  LucideIcon,
  Bookmark,
  LogIn,
} from "lucide-react";

import { CreateBlob } from "./create-blob";
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
  SidebarRail,
} from "../ui/sidebar";
import Link from "next/link";
import { NavUser } from "./nav-user";
import { useCurrentUser } from "@/hooks/use-current-user";
import { usePathname, useRouter } from "next/navigation";

export type SidebarNavItem = {
  href: string;
  title: string;
  icon: LucideIcon;
  auth?: boolean;
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const currentUser = useCurrentUser();
  const pathname = usePathname();
  const router = useRouter();

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
      auth: true,
    },
    {
      title: "Perfil",
      icon: User,
      href: `/profile/${currentUser?.id}`,
      auth: true,
    },
    {
      title: "Configurações",
      icon: Settings,
      href: "/settings",
    },
  ];

  function handleMenuClick(item: SidebarNavItem) {
    if (item.auth && !currentUser) {
      return router.push("/auth/login");
    }

    router.push(item.href);
  }

  return (
    <Sidebar {...props} collapsible="icon" className="h-svh">
      <SidebarHeader>
        {!currentUser ? (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                className="bg-primary text-primary-foreground hover:bg-primary/50 transition-all"
                size={"lg"}
                asChild
              >
                <Link href={"/auth/login"}>
                  <LogIn className="size-5" />
                  Entrar no Blob!
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
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
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    className="transition-all"
                    size="lg"
                    isActive={pathname === item.href}
                    onClick={() => handleMenuClick(item)}
                  >
                    <item.icon className="size-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Ações</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <CreateBlob />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
