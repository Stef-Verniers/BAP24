import createMollieClient from '@mollie/api-client';
import http from 'http';
import express from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config

const server = http.createServer(app);
const PORT = 3000;

// const mollieClient = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY });
console.log(process.env.MOLLIE_API_KEY);

// app.post((req, res) => {
//     const event = req.body;

// })