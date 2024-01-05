const express = require('express');
const app = express();
const cors = require('cors');
const { createMollieClient } = require('@mollie/api-client');
import { MOLLIE } from "$lib/server/config";

app.use(cors());

const mollieClient = createMollieClient({ apiKey: MOLLIE });

app.use(express.json());

app.get('/api/check-payment/:paymentId', async (req, res) => {
    try {
        const paymentId = req.params.paymentId;
        const payment = await mollieClient.payments.get(paymentId);
        res.json({ paymentStatus: payment.status });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Er is een fout opgetreden' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server luistert op poort ${PORT}`);
});