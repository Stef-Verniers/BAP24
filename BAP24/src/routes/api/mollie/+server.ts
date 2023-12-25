import { prisma } from "$lib/server/prisma";
import { json } from "@sveltejs/kit";
import createMollieClient from "@mollie/api-client";
import MOLLIE from '$env/static/private'
import { stringify } from "querystring";

// Mollie integratie... 
export async function POST({ request }) {
    try {
        const userId = request.body?.userId;
        const mollieClient = createMollieClient({ apiKey: "test_HrRGzGPRh57QFeaD7Pkk7zqWuTze8f" });
          
        const payment = await mollieClient.payments.create({
          amount: {
            currency: 'EUR',
            value: '10.00'
          },
          description: 'Survey for user #' + userId,
          redirectUrl: 'http://localhost:3000/dashboard',
          webhookUrl: 'http://localhost:3000/payments/webhook/',
          metadata: {
            userId: userId
          }
        });
    return new Response(null, { status: 403, headers: { 'Content-Type': 'application/json' }})
    } catch (error) {
      console.error(error)
        return new Response(null, { status: 500, headers: { 'Content-Type': 'application/json' }})
    }
}
