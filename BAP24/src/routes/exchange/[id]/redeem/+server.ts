import { json } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma.js";

// Post functie om een reward te claimen
export async function POST({ request }) {
    // We destructuren de data uit het request object
    const { userId, id, credits } = await request.json();
    // We halen de gebruiker op uit de database
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });
    // Geen gebruiker gevonden? 404 it is..
    if (!user) {
        return json({ error: "User not found" }, { status: 404 });
    }
    try {
        if(user.credits >= credits) {
            await prisma.user.update({
                data: {
                    credits: {
                        decrement: credits
                    }
                },
                where: {
                    id: userId
                }
            })
        }
        // We geven aan welk product we hebben geclaimd en door wie het verzilverd is.
        await prisma.exchangedReward.create({
            data: {
                userId: userId,
                productId: id,
            }
        })
        return json({ message: 'Aanvraag verwerkt', body: id, status: 200} );
    } catch (e) {
        console.error(e);
        return json({ error: "Error bij verwerken van je aanvraag" });
    }
}