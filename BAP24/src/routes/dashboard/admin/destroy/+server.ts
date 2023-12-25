import { json } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";

export async function DELETE({ request }) {

    try {
        const { item, type } = await request.json();
        if ( item && type === "user") {
            await prisma.user.delete({ where: { id: item.id } });
        } else if ( item && type === "sponsor" ) {
            await prisma.sponsor.delete({ where: { id: item.id } });
        } else {
            await prisma.product.delete({ where: { id: item.id } });
        }

        const products = await prisma.product.findMany({});
        const users = await prisma.user.findMany({});
        const sponsors = await prisma.sponsor.findMany({});

        console.log(users, products, sponsors);
        
        return json({ message: 'Met succes verwijderd', body: [...products, ...users, ...sponsors] }, { status: 200 });
    } catch (e) {
        console.error(e);
        return json({error: "Error"});
    }
}
