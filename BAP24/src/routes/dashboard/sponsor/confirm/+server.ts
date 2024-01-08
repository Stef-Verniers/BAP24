import { json } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma.js";

// De sponsor bevestigd dat de gebruiker zijn product heeft ontvangen
export async function PATCH({ request, locals }) {
    const session = await locals.auth.validate();
    try {
        const { item } = await request.json();
        console.log(item)
        const getExchangedProduct = await prisma.exchangedReward.findUnique({
            where: {
                id: item.id,
                userId: item.userId,
                productId: item.productId
            }
        });
        if (getExchangedProduct && !getExchangedProduct.exhanged) {
            await prisma.exchangedReward.update({
                where: {
                    id: item.id,
                    userId: item.userId,
                    productId: item.productId
                },
                data: {
                    exhanged: true
                }
            });
        }
        return json({ message: 'Item geverifieerd' });
    } catch (e) {
        console.error(e);
        return json({error: "Error"});
    }
}