import { AppSidebar } from "@/components/side-bar/app-sidebar";
import { SidebarRight } from "@/components/side-bar/sidebar-right";
import { SiteHeader } from "@/components/site-header";
import {
  SidebarProvider,
  SidebarInset,
  Sidebar,
  SidebarContent,
} from "@/components/ui/sidebar";
import { UserSuggestions } from "@/components/user-suggestions";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default async function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        {children}
        {/* <aside className="hidden lg:flex lg:w-80 flex-col gap-4 p-8 sticky top-0 h-screen overflow-y-auto border-l border-border"></aside> */}
      </SidebarInset>
      <SidebarRight />
    </SidebarProvider>
  );
}
