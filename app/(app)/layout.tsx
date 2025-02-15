import { AppSidebar } from "@/components/side-bar/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { UserSuggestions } from "@/components/user-suggestions";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default async function AppLayout({ children }: AppLayoutProps) {
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
        <UserSuggestions />
      </aside>
    </SidebarProvider>
  );
}
