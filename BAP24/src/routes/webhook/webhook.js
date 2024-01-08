// webhook.js
import express from 'express';
import { createMollieClient } from '@mollie/api-client';
import dotenv from 'dotenv';
import { prisma } from '$lib/server/prisma';
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
        if (res.body.status === 'paid') {
            await prisma.enquete.update({
                where: {
                    userId: res.body.metadata.currentLoggedInUser
                },
                data: {
                    isPaid: true
                }
            })
            localStorage.setItem("toast", JSON.stringify({ message: 'Met succes toegevoegd!', type: 'success', timeout: 5000 }));
        }
        if (res.body.status !== 'paid') {
            localStorage.setItem("toast", JSON.stringify({ message: `Er is iets misgegaan! (${res.body.status})`, type: 'error', timeout: 5000 }));
        }
    } catch (error) {
        console.error('Fout bij verwerken van webhook:', error);
        res.status(500).send('Er is een fout opgetreden');
    }
});

export default router;
