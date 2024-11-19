import { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  id: string;
  username?: string | null;
  avatarIcon?: string | null;
  avatarColor?: string | null;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
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
