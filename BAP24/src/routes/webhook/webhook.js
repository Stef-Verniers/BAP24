// webhook.js
import express from 'express';
import { createMollieClient } from '@mollie/api-client';
import dotenv from 'dotenv';
import prisma from '../../lib/server/prisma.ts';
dotenv.config();
const router = express.Router();

const mollieClient = createMollieClient({ apiKey: process.env.MOLLIE});

router.post('/', async (req, res) => {
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    try {
        console.log('Webhook ontvangen na de try', req.body);
        const paymentId = req.body.id;
        const payment = await mollieClient.payments.get(paymentId);

        console.log('Betaling ontvangen:', payment);

        console.log(res.body.status)
        res.status(200).send('OK');
        if (payment.status === 'paid') {
            await prisma.enquete.update({
                where: {
                    userId: payment.metadata.currentLoggedInUser
                },
                data: {
                    isPaid: true
                }
            });
            console.log('Betaling verwerkt en database bijgewerkt');
        }
    } catch (error) {
        console.error('Fout bij verwerken van webhook:', error);
        res.status(500).send('Er is een fout opgetreden');
    }
});

export default router;
