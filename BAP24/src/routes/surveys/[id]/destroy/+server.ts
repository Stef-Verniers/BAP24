import { json } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma.js";
import { auth } from "$lib/server/lucia";

// We verwijderen de enquête van de gebruiker
export async function DELETE({ request, locals }) {
    const session = await locals.auth.validate();
    const user = session?.user;
    console.log(session);

    try {
        const { userId, id, owner } = await request.json();
        console.log(userId, id, owner)
        const getSurvey = await prisma.enquete.findUnique({
            where: {
                id: id,
                userId: userId
            }
        });
        if (user?.admin) {
            await prisma.enquete.delete({
                where: {
                    id: id,
                    userId: owner
                },
            });
            return json({ message: 'Enquête verwijderd' });
        }
        if (getSurvey && !getSurvey.isVisible) {
            await prisma.enquete.delete({
                where: {
                    id: id,
                    userId: userId
                },
            });
        }
        return json({ message: 'Enquête verwijderd' });
    } catch (e) {
        console.error(e);
        return json({error: "Error"});
    }
}