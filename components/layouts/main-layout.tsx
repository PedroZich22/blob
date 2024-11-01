"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Home, Search, Bell, User, LucideIcon } from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
  rightSidebar?: React.ReactNode;
}

export function MainLayout({ children, rightSidebar }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gradient-to-b from-background/95 to-background">
        <AppSidebar />
        
        <SidebarInset>
          {children}
        </SidebarInset>

        {rightSidebar && (
          <aside className="hidden lg:flex lg:w-[350px] flex-col gap-4 pl-8 pr-4 py-6 sticky top-0 h-screen overflow-y-auto">
            {rightSidebar}
          </aside>
        )}

        <MobileNavigation />
      </div>
    </SidebarProvider>
  );
}

function MobileNavigation() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t lg:hidden">
      <nav className="flex items-center justify-around p-2">
        <MobileNavItem icon={Home} label="Home" isActive />
        <MobileNavItem icon={Search} label="Search" />
        <MobileNavItem icon={Bell} label="Notifications" />
        <MobileNavItem icon={User} label="Profile" />
      </nav>
    </div>
  );
}

function MobileNavItem({
  icon: Icon,
  label,
  isActive,
}: {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
}) {
  return (
    <button
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