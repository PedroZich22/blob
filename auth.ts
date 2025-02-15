import NextAuth, { DefaultSession } from "next-auth";
import authConfig from "./auth.config";
import { decode, encode } from "next-auth/jwt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db),
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === "credentials") token.credentials = true;
      return token;
    },
    async session({ session, user }) {
      if (session?.user) {
        session.user = {
          ...session.user,
          ...user,
        };
      }
      return session;
    },
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
    async encode(params) {
      if (params?.token?.credentials) {
        const expires = new Date(Date.now() + 60 * 60 * 24 * 30 * 1000);
        const sessionToken = uuidv4();

        if (!params.token.sub) {
          throw new Error("No user ID found in token");
        }

        const session = await PrismaAdapter(db).createSession!({
          userId: params.token.sub,
          sessionToken,
          expires,
        });

        if (!session) {
          throw new Error("No user ID found in token");
        }

        return sessionToken;
      }

      return encode(params);
    },
  },
  debug: process.env.NODE_ENV === "development",
  trustHost: true,
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
    async signOut(message) {
      if ("session" in message && message.session?.sessionToken) {
        await db.session.deleteMany({
          where: {
            sessionToken: message.session?.sessionToken,
          },
        });
      }
    },
  },
});

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string | null;
      email: string | null;
      username: string | null;
      image: string | null;
      password: string | null;
      emailVerified: Date | null;
      bio: string | null;
      avatarIcon: string | null;
      avatarColor: string | null;
      createdAt: Date;
      updatedAt: Date;
    } & DefaultSession["user"];
    sessionToken: string;
  }
}
