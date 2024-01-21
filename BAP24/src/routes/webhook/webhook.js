// webhook.js
import express from 'express';
import { createMollieClient } from '@mollie/api-client';
import dotenv from 'dotenv';
dotenv.config();
import { prisma } from '../../../src/lib/server/prisma.js';
const router = express.Router();
const mollieClient = createMollieClient({ apiKey: process.env.MOLLIE});

router.post('/', async (req, res) => {
    try {
        const paymentId = req.body.id;
        const payment = await mollieClient.payments.get(paymentId);
        res.status(200).send('OK');
        if (payment.status === 'paid') {
            await updateDatabaseWithPayment(paymentId, payment.metadata.currentLoggedInUser);
        } else {
            res.redirect('/payment-failed');
        }
    } catch (error) {
        console.error('Fout bij verwerken van webhook:', error);
        res.status(500).send('Er is een fout opgetreden');
    }
});

async function updateDatabaseWithPayment(paymentId, id) {
    await prisma.enquete.update({
        where: {
            userId: id,
        },
        data: {
            isPaid: true,
        },
    });

}

export default router;
