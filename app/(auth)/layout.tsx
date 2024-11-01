import { Logo } from "@/components/logo";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-b from-cyan-50 to-sky-50 dark:from-cyan-950 dark:to-sky-950">
      {children}
    </div>
  );
}
