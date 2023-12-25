import { json } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma.js";

export async function POST({ request }) {
    try {
        const { name, description, points, sponsor, category } = await request.json();
        const createProduct = await prisma.product.create({
            data: {
                name: name,
                description: description,
                points: Number(points),
                sponsorId: Number(sponsor),
                rewardCategoryId: Number(category),
            }
        });

        const getUpdatedProducts = await prisma.product.findMany({});
        
        return json({ message: 'Data succesvol ontvangen', success: true, body: getUpdatedProducts });
    } catch (error) {
        console.log(error)
        return json({ message: error, success: false }, { status: 500 });
    }
}