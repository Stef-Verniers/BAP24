import type { PrismaClient } from "@prisma/client";

declare global {
    namespace App {
        interface Locals {
            auth: import("lucia").AuthRequest
            validate: import("@lucia-auth/sveltekit").Validate
            validateUser: import("@lucia-auth/sveltekit").ValidateUser
            setSession: import("@lucia-auth/sveltekit").SetSession
        }
    }
    var __prisma: PrismaClient

    namespace Lucia {
        type Auth = import ("$lib/server/lucia").Auth
        type DatabaseUserAttributes = {
            username: string
            email: string
        };
        type DatabaseSessionAttributes = {};
    }
}

export {}