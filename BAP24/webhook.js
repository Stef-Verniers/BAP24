import http from 'http';
import express from 'express';
import dotenv from 'dotenv';
import { createMollieClient } from '@mollie/api-client';

const app = express();
dotenv.config()

const server = http.createServer(app);
const PORT = 3000;

const mollieClient = createMollieClient({ apiKey: process.env.MOLLIE });
console.log(process.env.MOLLIE);
console.log('tis werkend');

app.post('/webhook', async (req, res) => {
    const event = req.body;
    const payment = await mollieClient.payments.get('tr_WLaYhYY9ZW');
    console.log(payment);
})