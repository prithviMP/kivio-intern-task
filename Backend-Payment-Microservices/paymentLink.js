const Razorpay = require('razorpay');
require('dotenv').config();

async function generatePaymentLink(amount, currency, firstName,lastName, email, contactNumber) {
    const instance = new Razorpay({
        key_id: process.env.RAZORPAY_ID,
        key_secret: process.env.RAZORPAY_SECRET
    });

    try {
        const paymentLinkObject = await instance.paymentLink.create({
            amount: amount*100,
            currency: currency,
            accept_partial: true,
            first_min_partial_amount: 100,
            description: "Test payment for Kivio Intership Challenge [Udit]",
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
                policy_name: "Kivio Internship Challenge",
                customer_firstName: firstName,
                customer_lastName: lastName,
                customer_email: email,
                customer_contact: contactNumber
            },
            callback_url: "https://scaler.com",
            callback_method: "get"
        });

        const paymentLink = paymentLinkObject.short_url;
        return paymentLink;
    } catch (error) {
        console.error('Error creating payment link:', error);
        throw error;
    }
}
module.exports = generatePaymentLink;
