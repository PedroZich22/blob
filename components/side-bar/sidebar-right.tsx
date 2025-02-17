import { Sidebar, SidebarContent } from "../ui/sidebar";
import { UserSuggestions } from "../user-suggestions";

export function SidebarRight({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      {...props}
      collapsible="none"
      side="right"
      variant="floating"
      className="sticky hidden lg:flex top-0 h-svh border-l bg-background"
    >
      <SidebarContent className="p-4">
        <UserSuggestions />
      </SidebarContent>
    </Sidebar>
  );
}
