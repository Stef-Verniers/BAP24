import http from 'http';
import express from 'express';
import { handler } from './build/handler.js';
import router from './src/routes/webhook/webhook.js';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const PORT = 3000;

app.use('/webhook', cors(), express.json(), express.urlencoded({ extended: true }),router);
app.use(handler);


server.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
  console.log(router)
});