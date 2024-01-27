import NextAuth, { type DefaultSession } from "next-auth";
// import NextAuth, { type DefaultSession, type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      /** The user's id. */
      id: number;
    } & DefaultSession["user"];
  }
}

const BASE_URL = process.env.NEXTAUTH_URL || "http://localhost:3000";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const res = await fetch(BASE_URL + "/api/v1/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();
        if (res.ok && user.status !== "active") {
          return null;
        }
        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, profile, user }) {
      if (profile) {
        token.image = profile.picture;
      }
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    session({ session, token }) {
      session.user && (session.user.id = token.id as never);
      return session;
    },
    authorized({ auth }) {
      return !!auth?.user; // this ensures there is a logged in user for -every- request
    },
    redirect({ baseUrl }) {
      return baseUrl;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET,
  pages: {
    signIn: "/sdch-admin", // overrides the next-auth default signin page https://authjs.dev/guides/basics/pages
  },
});
