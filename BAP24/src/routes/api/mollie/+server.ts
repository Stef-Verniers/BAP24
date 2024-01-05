import { prisma } from "$lib/server/prisma";
import { json } from "@sveltejs/kit";
import { createMollieClient }  from "@mollie/api-client";
import { MOLLIE, PROFILE_ID } from "$lib/server/config";
import type { PaymentMethod } from "@mollie/api-client";

// Mollie integratie... 
export async function POST({ request }) {
    try {
        const requestBody = await request.json();
        const userId = requestBody.userId;
        const mollieClient = createMollieClient({ apiKey: MOLLIE });

        const payment = await mollieClient.payments.create({
          amount: {
            currency: 'EUR',
            value: '10.00'
          },
          description: 'Survey for user #' + PROFILE_ID,
          redirectUrl: 'https://bap24.hosted-power.dev/dashboard',
          webhookUrl: 'https://bap24.hosted-power.dev/api/mollie/webhook',
          metadata: {
            userId: PROFILE_ID
          },
          method: ['ideal', 'bancontact', 'belfius', 'creditcard', 'paypal', 'paysafecard', 'sofort'] as PaymentMethod[]
        });
    payment.getCheckoutUrl();
    console.log(payment.getCheckoutUrl());
    return new Response(null, { status: 403, headers: { 'Content-Type': 'application/json' }})
    } catch (error) {
      console.error(error)
        return new Response(null, { status: 500, headers: { 'Content-Type': 'application/json' }})
    }
}