import { json } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma.js";

// We deactiveren de enquête van de gebruiker
export async function PATCH({ request }) {
    try {
        const { userId, id } = await request.json();
        const getSurvey = await prisma.enquete.findUnique({
            where: {
                id: id,
                userId: userId
            }
        });
        if (getSurvey && getSurvey.isVisible) {
            await prisma.enquete.update({
                where: {
                    id: id,
                    userId: userId
                },
                data: {
                    isVisible: false
                }
            });
            return new Response(null, { status: 200, headers: { 'Content-Type': 'application/json' }})
        }
        return new Response(null, { status: 403, headers: { 'Content-Type': 'application/json' }})
    } catch (e) {
        console.error(e);
        return json({error: "Error"});
    }
}