// webhook.js
import express from 'express';
import { createMollieClient } from '@mollie/api-client';
import dotenv from 'dotenv';
dotenv.config();
import { prisma } from '../../../src/lib/server/prisma.js';
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
        res.status(200).send('OK');
        if (payment.status === 'paid') {
            console.log('Betaling verwerkt en database bijgewerkt');
            await updateDatabaseWithPayment(paymentId, payment.metadata.currentLoggedInUser);
        }
    } catch (error) {
        console.error('Fout bij verwerken van webhook:', error);
        res.status(500).send('Er is een fout opgetreden');
    }
});

async function updateDatabaseWithPayment(paymentId, id) {
    console.log('Database update voor betaling ID:', paymentId);
    prisma.enquete.update({
        where: {
            userId: id,
        },
        data: {
            isPaid: true,
        },
    });

}

export default router;
