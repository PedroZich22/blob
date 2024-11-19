import "./globals.css";

import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { auth } from "@/auth";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { QueryProvider } from "@/components/providers/query-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  icons: {
    icon: "/blob.ico",
  },
  keywords: ["blob", "social media", "simple", "twitter", "x"],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await auth();

  return (
    <html lang="pt-BR">
      <head />
      <body
        className={cn(
          "bg-background text-foreground antialiased",
          inter.className
        )}
      >
        <SessionProvider session={session}>
          <QueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </QueryProvider>
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
