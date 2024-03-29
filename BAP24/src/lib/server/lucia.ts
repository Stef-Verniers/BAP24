import { lucia } from "lucia";
import { sveltekit } from "lucia/middleware";
import { dev } from "$app/environment";
import { prisma } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export const auth = lucia({
	env: dev ? "DEV" : "PROD",
	middleware: sveltekit(),
	adapter: prisma(client),
    getUserAttributes(data) {
        return {
            userId: data.userId,
            username: data.username,
            email: data.email,
            additional: data.additional,
            credits: data.credits,
            admin: data.admin,
            sponsor: data.sponsor
        }
    },
});

interface UserSchema {
    userId: string;
    username: string;
    email: string;
    additional: string;
    credits: number;
    admin: boolean;
    sponsor: boolean;
}

export type Auth = typeof auth;