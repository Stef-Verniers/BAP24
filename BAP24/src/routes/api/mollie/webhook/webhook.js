// webhook.js
import express from 'express';
import { createMollieClient } from '@mollie/api-client';

const router = express.Router();

const mollieClient = createMollieClient({ apiKey: process.env.MOLLIE});

router.post('/', async (req, res) => {
    try {
        const paymentId = req.body.id;
        const payment = await mollieClient.payments.get(paymentId);

        console.log('Betaling ontvangen:', payment);

        res.status(200).send('OK');W
    } catch (error) {
        console.error('Fout bij verwerken van webhook:', error);
        res.status(500).send('Er is een fout opgetreden');
    }
});

export default router;
