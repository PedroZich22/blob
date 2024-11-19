import { Logo } from "./logo";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 p-2 border-b border-border backdrop-blur-sm flex items-center justify-center ">
      <Logo />
    </header>
  );
}
