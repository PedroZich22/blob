import { Logo } from "./logo";
import { SidebarTrigger } from "./ui/sidebar";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 p-2 backdrop-blur-sm bg-background/80 flex items-center justify-center">
      <div className="absolute left-0 ml-4">
        <SidebarTrigger />
      </div>

      <Logo />
    </header>
  );
}
