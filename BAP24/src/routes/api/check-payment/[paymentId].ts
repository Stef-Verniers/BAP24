import type { RequestHandler } from '@sveltejs/kit';
import { createMollieClient } from '@mollie/api-client';
import { MOLLIE } from "$lib/server/config";

const mollieClient = createMollieClient({ apiKey: MOLLIE });

export async function GET ({ params }) {
    const paymentId = params.paymentId;
    try {
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
