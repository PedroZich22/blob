"use client";

import { useAuth } from "@/hooks/use-auth";
import { Spinner } from "@/components/ui/spinner";

interface AuthLayoutProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export function AuthLayout({ children, requireAuth = false }: AuthLayoutProps) {
  const { isLoading } = useAuth(requireAuth);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return <>{children}</>;
} 