import { json } from "@sveltejs/kit";
import { createMollieClient }  from "@mollie/api-client";
import { MOLLIE, PROFILE_ID } from "$lib/server/config";
import type { PaymentMethod } from "@mollie/api-client";

// Mollie integratie... 
export async function POST({ request }) {
    try {
        const requestBody = await request.json();
        console.log(requestBody);
        const userId = requestBody.userId;
        const surveyName = requestBody.surveyName;
        const mollieClient = createMollieClient({ apiKey: MOLLIE });

        console.log(surveyName)

        const payment = await mollieClient.payments.create({
          amount: {
            currency: 'EUR',
            value: '10.00'
          },
          description: surveyName + ' - ' + userId,
          redirectUrl: 'https://bap24.hosted-power.dev/dashboard',
          webhookUrl: 'https://bap24.hosted-power.dev/api/mollie/webhook',
          metadata: {
            userId: PROFILE_ID
          },
          method: ['ideal', 'bancontact', 'belfius', 'creditcard', 'paypal', 'paysafecard', 'sofort'] as PaymentMethod[]
        });
        testmode: true
      const checkoutUrl = payment.getCheckoutUrl();
      return;
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