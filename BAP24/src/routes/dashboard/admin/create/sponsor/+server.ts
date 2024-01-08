import { json } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma.js";

export async function POST({ request }) {
    try {
        // We ontvangen de data voor het toevoegen van een sponsor
        const { name, address, city, owner, link } = await request.json();
        await prisma.sponsor.create({
            data: {
                name: name,
                address: address,
                city: city,
                ownerId: owner,
                url: link
            }
        });
        await prisma.user.update({
            where: {
                id: owner
            },
            data: {
                sponsor: true
            }
        })
        // We geven de nieuwe data terug
        const getUpdatedSponsors = await prisma.sponsor.findMany({});
        return json({ message: 'Data succesvol ontvangen', success: true, body: getUpdatedSponsors});
    } catch (error) {
        console.log(error)
        return json({ message: 'Er is een fout opgetreden', success: false }, { status: 500 });
    }
}