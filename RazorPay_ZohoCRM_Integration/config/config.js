const Razorpay = require('razorpay');
require('dotenv').config();

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

const webhookSecret = process.env.WEBHOOK_SECRET;

module.exports = {
  razorpayInstance,
  webhookSecret,
};
