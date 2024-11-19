"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Home, Search, Bell, User, LucideIcon } from "lucide-react";
import { TrendingTopics } from "../trending-topics";
import { SearchInput } from "../search-input";
import { UserSuggestions } from "../user-suggestions";
import { useRouter } from "next/navigation";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gradient-to-b from-background/95 to-background">
        <AppSidebar />

        <SidebarInset>{children}</SidebarInset>

        <aside className="hidden lg:flex lg:w-[350px] flex-col gap-4 pl-8 pr-4 py-6 sticky top-0 h-screen overflow-y-auto">
          <SearchInput />
          <div className="rounded-xl bg-card p-4 shadow-sm">
            <h2 className="font-semibold mb-3">Tópicos em alta</h2>
            <TrendingTopics />
          </div>
          <div className="rounded-xl bg-card p-4 shadow-sm">
            <h2 className="font-semibold mb-3">Quem seguir</h2>
            <UserSuggestions />
          </div>
        </aside>

        <MobileNavigation />
      </div>
    </SidebarProvider>
  );
}

function MobileNavigation() {
  const router = useRouter();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t lg:hidden">
      <nav className="flex items-center justify-around p-2">
        <MobileNavItem
          icon={Home}
          label="Home"
          isActive
          onClick={() => {
            router.push("/");
          }}
        />
        <MobileNavItem
          icon={Search}
          label="Search"
          onClick={() => {
            router.push("/search");
          }}
        />
        <MobileNavItem
          icon={Bell}
          label="Notifications"
          onClick={() => {
            router.push("/notifications");
          }}
        />
        <MobileNavItem
          icon={User}
          label="Profile"
          onClick={() => {
            router.push("/profile");
          }}
        />
      </nav>
    </div>
  );
}

function MobileNavItem({
  icon: Icon,
  label,
  isActive,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1 p-2 rounded-full",
        isActive ? "text-primary" : "text-muted-foreground"
      )}
    >
      <Icon className="h-6 w-6" />
      <span className="text-xs">{label}</span>
    </button>
  );
}
