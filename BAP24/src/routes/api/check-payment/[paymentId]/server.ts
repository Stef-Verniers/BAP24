const express = require('express');
const app = express();
const cors = require('cors');
const { createMollieClient } = require('@mollie/api-client'); // Importeer Mollie client

app.use(cors());

// Stel de Mollie client in
const mollieClient = createMollieClient({ apiKey: 'jouw_mollie_api_sleutel' });

app.use(express.json());

// Definieer de route
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