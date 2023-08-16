import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient, User as PrismaUser } from '@prisma/client';
import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: Record<"username" | "password", string> | undefined, req: any) {
                // Check if credentials are provided
                if (!credentials || !credentials.username || !credentials.password) {
                    return null;
                }
            
                const user: PrismaUser | null = await prisma.user.findUnique({
                    where: { username: credentials.username },
                });
            
                if (user && bcrypt.compareSync(credentials.password, user.password)) {
                    // Return the user object without the password field
                    const { password, ...safeUserData } = user;
                    return safeUserData;
                } else {
                    return null;
                }
            },
        }),
    ],
    adapter: PrismaAdapter(prisma),
});

