import { PrismaClient, User as PrismaUser } from '@prisma/client';
import bcrypt from 'bcrypt';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const MIN_PASSWORD_LENGTH = 8;
const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10');

const validateCredentials = (username: string, password: string): string | null => {
    if (!username.trim()) return 'Username cannot be empty.';
    if (password.length < MIN_PASSWORD_LENGTH) return `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`;
    return null;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed.' });
    }

    const { username, password } = req.body;

    const normalizedUsername = username.toLowerCase().trim();

    const validationError = validateCredentials(normalizedUsername, password);
    if (validationError) {
        return res.status(400).json({ error: validationError });
    }

    try {
        // Check if user already exists
        const existingUser: PrismaUser | null = await prisma.user.findUnique({
            where: { username: normalizedUsername },
        });

        if (existingUser) {
            return res.status(400).json({ error: 'Registration failed.' });
        }

        // Hash the password asynchronously
        const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

        // Store the new user in the database
        const newUser = await prisma.user.create({
            data: {
                username: normalizedUsername,
                password: hashedPassword,
            },
        });

        // Return the user object without the password field
        const { password: _, ...safeUserData } = newUser;
        res.status(201).json({ data: safeUserData });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
}