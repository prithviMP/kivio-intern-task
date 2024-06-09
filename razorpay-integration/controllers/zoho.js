const axios = require("axios");

const CLIENT_ID = process.env.ZOHO_CLIENT_ID;
const CLIENT_SECRET = process.env.ZOHO_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.ZOHO_REFRESH_TOKEN;
const REDIRECT_URI = process.env.ZOHO_REDIRECT_URI;

exports.generateAccessToken = async () => {
  try {
    // Send a POST request to Zoho's token endpoint to get an access token using refresh token
    const response = await axios.post("https://accounts.zoho.com/oauth/v2/token", {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: REFRESH_TOKEN,
      grant_type: "refresh_token",
      redirect_uri: REDIRECT_URI,
    });

    // Return the access token received from the response
    return response.data.access_token;
  } catch (error) {
    console.error("Error generating access token:", error.response.data);
    throw new Error("Failed to generate access token for Zoho CRM");
  }
};

exports.createLead = async (accessToken, paymentDetails) => {
  try {
    // Construct lead data using payment details
    const leadData = {
      data: [
        {
          Last_Name: paymentDetails.customer.name,
          Email: paymentDetails.customer.email,
          Phone: paymentDetails.customer.contact,
          Description: `Payment of ${paymentDetails.amount} received from ${paymentDetails.customer.name}`,
        },
      ],
    };

    // Send a POST request to Zoho CRM's leads endpoint to create a new lead
    const response = await axios.post("https://www.zohoapis.com/crm/v2/Leads", leadData, {
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    // Return the ID of the newly created lead
    return response.data.data[0].details.id;
  } catch (error) {
    console.error("Error creating lead in Zoho CRM:", error.response.data);
    throw new Error("Failed to create lead in Zoho CRM");
  }
};
