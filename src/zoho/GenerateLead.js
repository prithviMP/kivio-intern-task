import AccessToken from "./GenerateToken.js";
import axios from "axios";

export default async function GenerateLead(order, razorpayPaymentResponse) {
  const accessToken = await AccessToken();
  const response = await axios.post(
    'https://www.zohoapis.in/crm/v2/Leads', {
    data: [{
      First_Name: order.notes.firstName,
      Last_Name: order.notes.lastName,
      Email: order.notes.email,
      Phone: order.notes.phone,
      Lead_Title: `Order of INR ${order.amount} ${order.status} for user ${order.notes.email}`,
      Order_Details: order,
      Razorpay_Details: razorpayPaymentResponse
    }],
    trigger: [
      'approval',
      'workflow',
      'blueprint',
    ],
  }, {
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`
    },
  }
  );
  console.log(response.data, 'Added to ZOHO CRM');
}