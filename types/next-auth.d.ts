import type { User } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User & {
      id: string;
      username?: string | null;
      avatarIcon?: string | null;
      avatarColor?: string | null;
    };
  }

  interface User {
    id: string;
    username?: string | null;
    avatarIcon?: string | null;
    avatarColor?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username?: string | null;
    avatarIcon?: string | null;
    avatarColor?: string | null;
  }
} 