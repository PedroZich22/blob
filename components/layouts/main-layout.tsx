"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SearchInput } from "../search-input";
import { UserSuggestions } from "../user-suggestions";
import { SiteHeader } from "../site-header";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="flex-1 w-full border-r boder-border">
          <SiteHeader />
          {children}
        </main>
      </SidebarInset>
      <aside className="hidden lg:flex lg:w-[350px] flex-col gap-4 p-8 sticky top-0 h-screen overflow-y-auto">
        <SearchInput />
        <UserSuggestions />
      </aside>
    </SidebarProvider>
  );
}
