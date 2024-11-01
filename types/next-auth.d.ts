import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    username?: string | null;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      username?: string | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username?: string | null;
  }
} 