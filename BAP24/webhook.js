const mollie = require('@mollie/api-client');
const app = require('express')();
const bodyParser = require('body-parser');
require('dotenv').config();

const mollieClient = mollie({ apiKey: process.env.MOLLIE_API_KEY });
console.log(process.env.MOLLIE_API_KEY);

// app.post((req, res) => {
//     const event = req.body;

// })