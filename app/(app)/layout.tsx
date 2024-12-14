import { MainLayout } from "@/components/layouts/main-layout";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return <MainLayout>{children}</MainLayout>;
}
