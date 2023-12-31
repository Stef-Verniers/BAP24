import http from 'http';
import express from 'express';
import { handler } from './build/handler.js';

const app = express();
const server = http.createServer(app);
// Change the port if you want
const PORT = 3000;

// SvelteKit handlers
app.use(handler);

server.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});