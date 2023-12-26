import { json } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma.js";

export async function POST({ request }) {
    try {

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
        const getUpdatedSponsors = await prisma.sponsor.findMany({});

        return json({ message: 'Data succesvol ontvangen', success: true, body: getUpdatedSponsors});
    } catch (error) {
        console.log(error)
        return json({ message: 'Er is een fout opgetreden', success: false }, { status: 500 });
    }
}