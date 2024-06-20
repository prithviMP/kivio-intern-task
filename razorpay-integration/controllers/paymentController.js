const Razorpay = require("razorpay");

// Razorpay configuration
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async (req, res) => {
  const {amount, currency} = req.body;

  try {
    const options = {
      amount: amount * 100, // Amount in paise
      currency: currency,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

exports.createPaymentLink = async (req, res) => {
  const {amount, currency, firstName, lastName, email, phoneNumber} = req.body;

  const options = {
    amount: amount * 100, // Amount in paise
    currency: currency,
    description: `Payment for ${firstName} ${lastName}`,
    customer: {
      name: `${firstName} ${lastName}`,
      contact: phoneNumber,
      email: email,
    },
    callback_url: "https://1e9d-2405-201-d00e-60ae-2164-88f5-b155-3dfb.ngrok-free.app/webhooks/razorpay",
  };

  try {
    const paymentLink = await razorpay.paymentLink.create(options);
    const response = {
      id: paymentLink.id,
      payment_url: paymentLink.short_url,
    };
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

exports.paymentCallback = (req, res) => {
  const order_id = req.query.order_id;

  if (order_id) {
    res.send(`Payment successful! Order ID: ${order_id}. Thank you for your payment.`);
  } else {
    res.send("Payment successful! Thank you for your payment.");
  }
};
