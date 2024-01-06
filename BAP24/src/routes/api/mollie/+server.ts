import { json } from "@sveltejs/kit";
import { createMollieClient }  from "@mollie/api-client";
import { MOLLIE, PROFILE_ID } from "$lib/server/config";
import { auth } from '$lib/server/lucia';
import type { PaymentMethod } from "@mollie/api-client";
import type { PageServerLoad } from "../../$types";
import { redirect } from "@sveltejs/kit";

let session;
let user;

export const load: PageServerLoad = async ({ locals }) => {
	session = await locals.auth.validate();
    if (!session) {
        throw redirect(302, "/");
    }
    user = await auth.getUser(session.user.userId)
}

// Mollie integratie... 
export async function POST({ request }) {
    try {
        const requestBody = await request.json();
        const userId = requestBody.userId;
        const surveyName = requestBody.surveyTitle;
        const mollieClient = createMollieClient({ apiKey: MOLLIE });

        const payment = await mollieClient.payments.create({
          amount: {
            currency: 'EUR',
            value: '7.99'
          },
          description:  `${surveyName} - ` + userId,
          redirectUrl: 'https://bap24.hosted-power.dev/payment-success',
          webhookUrl: 'https://bap24.hosted-power.dev/api/mollie/webhook',
          metadata: {
            userId: PROFILE_ID,
            currentLoggedInUser: user.userId,
          },
          method: ['ideal', 'bancontact', 'belfius', 'creditcard', 'paypal', 'paysafecard', 'sofort'] as PaymentMethod[],
        });
      console.log(payment);
      const checkoutUrl = payment.getCheckoutUrl();
      return json({
        message: 'Checkout URL gegenereerd',
        success: true,
        checkoutUrl: checkoutUrl,
        paymentId: payment.id
    });
} catch (error) {
      console.error(error)
      return json({ message: error, success: true});
    }
}