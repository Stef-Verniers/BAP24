import { json } from "@sveltejs/kit";
import { createMollieClient }  from "@mollie/api-client";
import { MOLLIE } from "$lib/server/config";
import type { PaymentMethod } from "@mollie/api-client";
import { prisma } from "$lib/server/prisma";


// Mollie integratie
export async function POST({ request }) {
    try {
        const requestBody = await request.json();
        const userId = requestBody.loggedUser;
        const surveyName = requestBody.surveyTitle;
        const mollieClient = createMollieClient({ apiKey: MOLLIE });

        const payment = await mollieClient.payments.create({
          amount: {
            currency: 'EUR',
            value: '7.99'
          },
          description:  `${surveyName} - ` + userId,
          redirectUrl: 'https://bap24.hosted-power.dev/payment-success',
          webhookUrl: 'https://bap24.hosted-power.dev/webhook',
          metadata: {
            currentLoggedInUser: userId,
          },
          method: ['ideal', 'bancontact', 'belfius', 'creditcard', 'paypal', 'paysafecard', 'sofort'] as PaymentMethod[],
        });
      await prisma.enquete.update({
        where: {
          userId: userId
        },
        data: {
          isPaid: true
        }
      })
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