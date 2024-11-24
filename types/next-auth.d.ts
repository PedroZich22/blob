import { User, type DefaultSession } from "next-auth";

type ExtendedUser = {
  id: string;
  username: string;
  name: string;
  image: string;
  bio: string;
  avatarIcon: string;
  avatarColor: string;
  createdAt: Date;
  updatedAt: Date;
};

declare module "next-auth" {
  interface User extends ExtendedUser {}

  interface Session {
    user: User & ExtendedUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends User, ExtendedUser {}
}
