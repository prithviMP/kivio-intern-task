const crypto = require('crypto');
const { webhookSecret } = require('../config/config');
const { saveLead } = require('../services/leadService');

const handleWebhook = async (req, res) => {
  const payload = JSON.stringify(req.body);
  const signature = req.get('X-Razorpay-Signature');

  try {
    const expectedSignature = crypto.createHmac('sha256', webhookSecret)
      .update(payload)
      .digest('hex');

    if (signature !== expectedSignature) {
      console.error('Invalid webhook signature');
      return res.status(400).send('Invalid signature');
    }

    const { payment } = req.body.payload;
    const { notes } = payment.entity;

    const lead = {
      First_Name: notes.customer_firstName,
      Last_Name: notes.customer_lastName,
      Email: notes.customer_email,
      Phone: notes.customer_contact,
    };

    const result = await saveLead(lead);
    res.send(result);
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).send('Error processing webhook');
  }
};

module.exports = {
  handleWebhook,
};
