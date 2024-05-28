const { razorpayInstance } = require('../config/config');

const generatePaymentLink = async (amount, currency, firstName, lastName, email, contactNumber) => {
  try {
    const paymentLinkObject = await razorpayInstance.paymentLink.create({
      amount: amount * 100,
      currency: currency,
      accept_partial: true,
      first_min_partial_amount: 100,
      description: "For Testing purpose",
      customer: {
        name: firstName,
        email: email,
        contact: contactNumber
      },
      notify: {
        sms: true,
        email: true
      },
      reminder_enable: true,
      notes: {
        policy_name: "Jeevan Bima",
        customer_firstName: firstName,
        customer_lastName: lastName,
        customer_email: email,
        customer_contact: contactNumber
      },
      callback_url: "https://google.com",
      callback_method: "get"
    });

    const paymentLink = paymentLinkObject.short_url;
    return paymentLink;
  } catch (error) {
    console.error('Error creating payment link:', error);
    throw error;
  }
};

module.exports = {
  generatePaymentLink,
};
