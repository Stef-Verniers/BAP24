import type { RequestHandler } from '@sveltejs/kit';
import { createMollieClient } from '@mollie/api-client';
import { MOLLIE } from "$lib/server/config";

const mollieClient = createMollieClient({ apiKey: MOLLIE });

export const POST: RequestHandler = async ({ request }) => {

    try {
        const body = await request.json();
        const paymentId = body.id;

        const payment = await mollieClient.payments.get(paymentId);
        if (payment.status === 'paid') {
            console.log('Payment received');
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
