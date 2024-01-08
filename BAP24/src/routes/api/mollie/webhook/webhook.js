// webhook.js
import express from 'express';
import { createMollieClient } from '@mollie/api-client';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

const mollieClient = createMollieClient({ apiKey: process.env.MOLLIE});

router.post('/', async (req, res) => {
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    try {
        console.log('Webhook ontvangen na de try', req.body);
        const paymentId = req.body.id;
        const payment = await mollieClient.payments.get('tr_FyWE8jC2EN');

        console.log('Betaling ontvangen:', payment);

        res.status(200).send('OK');
    } catch (error) {
        console.error('Fout bij verwerken van webhook:', error);
        res.status(500).send('Er is een fout opgetreden');
    }
});

export default router;
