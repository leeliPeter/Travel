import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/server"
import Google from "next-auth/providers/google"
import Github from "next-auth/providers/github"
import { NextAuthOptions } from "next-auth"
import { getServerSession } from "next-auth/next"

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  secret: process.env.SECRET!,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    Github({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
}

export const auth = () => getServerSession(authOptions)
const handler = NextAuth(authOptions)
export const handlers = { GET: handler, POST: handler }

