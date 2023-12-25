import { json } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma.js";

export async function POST({ request }) {
    try {
        // We halen de ID van de gebruiker op
        const { userId } = await request.json();
        // We controleren of de gebruiker bestaat
        const valid = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        // Niet geldig/ 404 it is..
        if (!valid) {
            return json({ error: "User not found" }, { status: 404 });
        }
        // We halen de enquête op van de gebruiker
        const survey = await prisma.enquete.findUnique({
            where: {
                userId: userId
            }
        });
        // We controleren of de enquête bestaat en of de gebruiker meer dan 25 credits heeft
        // Indien ja, dan trekken we 25 credits af en zetten we de enquête op betaald
        if (survey && valid.credits >= 25) {
            await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    credits: valid.credits - 25
                }
            });
            await prisma.enquete.update({
                where: {
                    userId: userId
                },
                data: {
                    isPaid: true
                }
            });
            return json({ message: 'Vragen opgeslagen' }, { status: 200 });
        } else {
            return json({ error: "Insufficient credits or survey not found" }, { status: 403 });
        }
    } catch (e) {
        console.error(e);
        return json({ error: "Error bij het opslaan van vragen" }, { status: 500 });
    }
}