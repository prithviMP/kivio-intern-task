const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const Razorpay = require('razorpay');
const generatePaymentLink = require('./paymentLink')
const saveLead = require('./savelead');

const app = express();

require('dotenv').config();

const PORT = 8080;

app.use(bodyParser.json());


const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

const webhookSecret = process.env.WEBHOOK_SECRET;




app.post('/payment', async (req, res) => {
  const { amount, currency, firstName , lastName , email, phone } = req.body;
  try {
    const paymentLink = await generatePaymentLink(amount, currency, firstName,lastName, email, phone);
    res.json({ paymentLink });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create payment link' });
  }
});

app.post('/webhook', async (req, res) => {
  
  const payload = JSON.stringify(req.body); // Convert request body to JSON string
  const signature = req.get('X-Razorpay-Signature'); // Get signature from request headers

  try {
    // Verify webhook signature
    const expectedSignature = crypto.createHmac('sha256', webhookSecret)
      .update(payload)
      .digest('hex');

    if (signature !== expectedSignature) {
      console.error('Invalid webhook signature');
      return res.status(400).send('Invalid signature');
    }

    // Extract payment information from the payload
    const { payment } = req.body.payload;

    // Extract important details from the payment object
    const { notes } = payment.entity;

    console.log(payment.entity)
    // Store the payment as a lead (example)
    const lead = {
      First_Name: notes.customer_firstName,
      Last_Name: notes.customer_lastName,
      Email: notes.customer_email,
      Phone: notes.customer_contact,
    };

    // Here you can save the lead to your database or CRM
    console.log("saving lead")
    const result = await saveLead(lead);
    res.send(result);

  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).send('Error processing webhook');
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

