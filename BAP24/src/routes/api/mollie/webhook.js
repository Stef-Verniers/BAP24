import { prisma } from "$lib/server/prisma";

export async function POST({ request }) {
    try {
        const payload = await request.json();
        const paymentId = payload.id; 
        
        console.log(`Webhook ontvangen voor betaling ID: ${paymentId}`);

        return new Response(null, { status: 200 });
    } catch (error) {
        console.error('Fout bij verwerken webhook:', error);
        return new Response(null, { status: 500 });
    }
}
