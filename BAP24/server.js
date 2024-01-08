import http from 'http';
import express from 'express';
import { handler } from './build/handler.js';
import router from './src/routes/api/mollie/webhook/webhook.js';
import cors from 'cors';

app.use(cors());
const app = express();
const server = http.createServer(app);
const PORT = 3000;

app.use(handler);

server.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});

app.use('/api/mollie/webhook', router);