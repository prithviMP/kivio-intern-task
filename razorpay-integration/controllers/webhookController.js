const zoho = require("./zoho"); // Import the module to handle Zoho CRM integration
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.webhook = async (req, res) => {
  try {
    // Process webhook data received from Razorpay
    const paymentDetails = req.body;
    console.log(JSON.stringify(paymentDetails.payload.payment.entity.id));
    const payment_info = await razorpay.payments.fetch(paymentDetails.payload.payment.entity.id);
    console.log(payment_info);

    // Generate access token for Zoho CRM
    console.log("Generating Access Token....");
    const accessToken = await zoho.generateAccessToken();
    console.log("Access token generated:", accessToken);

    // Store payment details as leads in Zoho CRM
    console.log("Adding payment details as lead in Zoho CRM...");
    const leadResponse = await zoho.createLead(accessToken, paymentDetails);
    console.log("Lead creation response:", leadResponse);

    // Send response
    res.status(200).send("OK");
  } catch (error) {
    console.error("Error processing webhook:");
    res.status(500).send("Internal Server Error");
  }
};
