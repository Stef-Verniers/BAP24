import { json } from "@sveltejs/kit";
import { createMollieClient }  from "@mollie/api-client";
import { MOLLIE, PROFILE_ID, loggedUser } from "$lib/server/config";
import type { PaymentMethod } from "@mollie/api-client";
import { log } from "console";


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
          description:  `${surveyName} - ` + loggedUser,
          redirectUrl: 'https://bap24.hosted-power.dev/payment-success',
          webhookUrl: 'https://bap24.hosted-power.dev/api/mollie/webhook',
          metadata: {
            currentLoggedInUser: loggedUser,
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