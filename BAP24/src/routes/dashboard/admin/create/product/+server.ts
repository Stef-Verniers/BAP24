import { json } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma.js";


// Met deze functie maken we een nieuw product en schrijven het naar de database
export async function POST({ request }) {
    try {
        const formData = await request.json();
        await prisma.product.create({
            data: {
                name: formData.name,
                description: formData.description,
                points: Number(formData.points),
                sponsorId: Number(formData.sponsor),
                rewardCategoryId: Number(formData.category),
            }
        });

        const getUpdatedProducts = await prisma.product.findMany({});
        
        return json({ message: 'Data succesvol ontvangen', success: true, body: getUpdatedProducts });
    } catch (error) {
        console.log(error)
        return json({ message: error, success: false }, { status: 500 });
    }
}