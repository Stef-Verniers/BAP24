// src/routes/api/mollie-webhook.ts
import type { RequestHandler } from '@sveltejs/kit';
import { createMollieClient } from '@mollie/api-client';
import { MOLLIE } from "$lib/server/config";
import { auth } from '$lib/server/lucia';
import { prisma } from '$lib/server/prisma';
import { goto } from '$app/navigation';



const mollieClient = createMollieClient({ apiKey: MOLLIE });

export const POST: RequestHandler = async ({ request, locals }) => {

    const session = await locals.auth.validate();
    if (!session) {
        return {
            status: 401,
            body: { error: 'Geen toegang' }
        };
    }

    const user = await auth.getUser(session.user.userId)

    try {
        const body = await request.json();
        const paymentId = body.id;

        const payment = await mollieClient.payments.get(paymentId);
        if (payment.status === 'paid') {
            await prisma.enquete.update({
                where: { userId: user.userId },
                data: { isPaid: true }
            });
            goto('/dashboard');
        }

        return {
            status: 200,
            body: { message: 'Webhook verwerkt' }
        };
    } catch (error) {
        console.error(error);
        return {
            status: 500,
            body: { error: 'Er is een fout opgetreden bij het verwerken van de webhook.' }
        };
    }
};
