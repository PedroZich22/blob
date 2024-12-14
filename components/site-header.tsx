import { Logo } from "./logo";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 p-2 backdrop-blur-sm bg-background/80 flex items-center justify-center">
      <Logo />
    </header>
  );
}
