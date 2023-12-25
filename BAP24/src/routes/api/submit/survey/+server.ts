import { json } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma.js";

export async function POST({ request }) {
    try {
        // We slaan vragen op in de database
        const { enqueteId, questions } = await request.json();
        
        await prisma.$transaction(
            questions.map(q =>
                prisma.enqueteQuestion.create({
                    data: {
                        enqueteId: enqueteId,
                        text: q.content,
                        type: q.type,
                        options: {
                            create: q.type === 'select' ? q.options.map(o => ({ text: o })) : []
                        }
                    }
                })
            )
        );

        await prisma.enquete.update({
            where: {
                id: enqueteId
            },
            data: {
                isCreated: true
            }
        });

        return json({ message: 'Vragen opgeslagen' });
    } catch (e) {
        console.error(e);
        return json({ error: "Error bij het opslaan van vragen" });
    }
}