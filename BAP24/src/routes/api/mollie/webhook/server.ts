import { createMollieClient }  from "@mollie/api-client";
import { MOLLIE } from "$lib/server/config";

const mollieClient = createMollieClient({ apiKey: MOLLIE });

const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/check-payment/:paymentId', async (req, res) => {
    const paymentId = req.params.paymentId;
    const status = await mollieClient.payments.get(paymentId);
    res.json({ paymentStatus: status.status });
});
