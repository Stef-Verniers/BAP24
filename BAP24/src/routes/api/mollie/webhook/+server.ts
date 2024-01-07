import { createMollieClient } from '@mollie/api-client';
import { MOLLIE } from "$lib/server/config";
import { prisma } from '$lib/server/prisma';

const mollieClient = createMollieClient({ apiKey: MOLLIE });
// Webhook die luistert naar de response van Mollie en database aanpast bij aanvaarde betaling
export async function POST ({ request }) {
    try {
        const body = await request.json();
        const paymentId = body.id;
        const userId = body.metadata.currentLoggedInUser;
        const payment = await mollieClient.payments.get(paymentId);
        if (payment.status === 'paid') {
            const survey = await prisma.enquete.findUnique({
                where: {
                    userId: userId
                }
            });
            if (survey) {
                await prisma.enquete.update({
                    where: {
                        userId: userId
                    },
                    data: {
                        isPaid: true
                    }
                });
            }
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
