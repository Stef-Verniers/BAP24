import { json } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";

export async function POST({ request }) {

    const { user, role } = await request.json();
    try {
        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                admin: role === 'admin' ? true : false,
                sponsor: role === 'sponsor' ? true : false,
            }
        });

        const users = await prisma.user.findMany({});
        return json({ message: 'Rol succesvol gewijzigd', body: {users} }, { status: 200 });
    } catch(e) {
        console.error(e);
        return json({ error: "Error bij het wijzigen van de rol" }, { status: 500 });
    }
}