import type { RequestHandler } from '@sveltejs/kit';
import { createMollieClient } from '@mollie/api-client';
import { MOLLIE } from "$lib/server/config";
import { auth } from '$lib/server/lucia';
import { prisma } from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../../../$types';

const mollieClient = createMollieClient({ apiKey: MOLLIE });
let session;
let user;
let isSurveyCompleted;

export const load: PageServerLoad = async ({ locals }) => {
	session = await locals.auth.validate();
    if (!session) {
        throw redirect(302, "/");
    }
    user = await auth.getUser(session.user.userId)
}

export async function GET (request) {
    const body = await request.json();
    const paymentId = body.id;
    const payment = await mollieClient.payments.get('tr_4SCfhenyXR');
    if (payment.status === 'paid') {
        isSurveyCompleted = true;
    } else {
        isSurveyCompleted = false;
        console.log( 'Payment status: ' + payment.status)
    }
}

export async function POST ({ request }) {
    try {
        if (isSurveyCompleted) {
            const survey = await prisma.enquete.findUnique({
                where: {
                    userId: user.userId
                }
            });
            if (survey) {
                await prisma.enquete.update({
                    where: {
                        userId: user.userId
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
