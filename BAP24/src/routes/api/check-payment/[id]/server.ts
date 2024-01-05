import type { RequestHandler } from '@sveltejs/kit';
import { createMollieClient } from '@mollie/api-client';
import { MOLLIE } from "$env/static/private"; // Zorg ervoor dat MOLLIE correct is geïmporteerd

const mollieClient = createMollieClient({ apiKey: MOLLIE });

console.log('test');

export const get: RequestHandler = async ({ params }) => {
    try {
        const paymentId = params.id;
        const payment = await mollieClient.payments.get(paymentId);
        return {
            status: 200,
            body: { paymentStatus: payment.status }
        };
    } catch (error) {
        console.error(error);
        return {
            status: 500,
            body: { message: 'Er is een fout opgetreden' }
        };
    }
};
