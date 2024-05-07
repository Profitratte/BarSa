import {
  getServerSession,
  type NextAuthOptions,
} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaClient, User as PrismaUser } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt", 
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && account.type === "credentials") { 
        token.userId = account.providerAccountId; // this is Id that coming from authorize() callback 
      }
      return token;
    },
    async session({ session, token, user }) {
      delete session.user.name;
      delete session.user.email;
      delete session.user.image;
      session.user.id = token.userId; 
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Proff" },
        password: { label: "Passwort", type: "password", placeholder: "Passwort" },
      },
      async authorize(credentials: Record<"username" | "password", string> | undefined, req: any) {
        // Check if credentials are provided
        if (!credentials || !credentials.username || !credentials.password) {
          return null;
        }

        //debug
        console.log("credentials", credentials);

        const user: PrismaUser | null = await prisma.user.findUnique({
          where: { username: credentials.username },
        });

        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          // Return the user object without the password field
          const { password, ...safeUserData } = user;
          //debug
          console.log("password match")
          return safeUserData;
        } else {
          //debug
          console.error("no user or no match");
          return null;
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
};

export const getServerAuthSession = () => getServerSession(authOptions); //(6) 