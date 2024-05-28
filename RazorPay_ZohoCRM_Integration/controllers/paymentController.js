const { generatePaymentLink } = require('../services/paymentService');

const createPaymentLink = async (req, res) => {
  const { amount, currency, firstName, lastName, email, phone } = req.body;
  try {
    const paymentLink = await generatePaymentLink(amount, currency, firstName, lastName, email, phone);
    res.json({ paymentLink });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create payment link' });
  }
};

module.exports = {
  createPaymentLink,
};
