import { json } from "@sveltejs/kit";
import { createMollieClient }  from "@mollie/api-client";
import { MOLLIE, PROFILE_ID, SURVEY_NAME } from "$lib/server/config";
import type { PaymentMethod } from "@mollie/api-client";

let surveyName = "";

// Mollie integratie... 
export async function POST({ request }) {
    try {
        const requestBody = await request.json();
        const userId = requestBody.userId;
        const mollieClient = createMollieClient({ apiKey: MOLLIE });

        console.log(PROFILE_ID)

        const payment = await mollieClient.payments.create({
          amount: {
            currency: 'EUR',
            value: '10.00'
          },
          description: '' + SURVEY_NAME + ' - ' + userId,
          redirectUrl: 'https://bap24.hosted-power.dev/dashboard',
          webhookUrl: 'https://bap24.hosted-power.dev/api/mollie/webhook',
          metadata: {
            userId: PROFILE_ID
          },
          method: ['ideal', 'bancontact', 'belfius', 'creditcard', 'paypal', 'paysafecard', 'sofort'] as PaymentMethod[]
        });
        testmode: true
      const checkoutUrl = payment.getCheckoutUrl();
      return json({
        message: 'Checkout URL gegenereerd',
        success: true,
        checkoutUrl: checkoutUrl
    });
} catch (error) {
      console.error(error)
      return json({ message: error, success: true});
    }
}