require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const Razorpay = require('razorpay');
const FormData = require('form-data');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

const razorpayInstance = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });

const Accounts_URL = 'https://accounts.zoho.in';

let access_token = null;
let refresh_token = null;

// Function to initialize access token
async function initializeAccessToken() {
    const formData = new URLSearchParams();
    formData.append('grant_type', 'authorization_code');
    formData.append('client_id', process.env.ZOHO_CLIENT_ID);
    formData.append('client_secret', process.env.ZOHO_CLIENT_SECRET);
    formData.append('code', process.env.ZOHO_GRANT_TOKEN);
    formData.append('redirect_uri', 'https://kivio-intern-task.onrender.com');

    try {
        const response = await axios.post(`${Accounts_URL}/oauth/v2/token`, formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });

        const responseData = response.data;
        console.log("Zoho CRM auth request response: ", responseData);
        access_token = responseData.access_token;
        refresh_token = responseData.refresh_token;

        setInterval(refreshAccessToken, 3000000);
    } catch (error) {
        console.error('Error initializing access token: ', error.message);
    }
}

// Function to refresh access token
function refreshAccessToken() {
    const requestBody = new URLSearchParams();
    requestBody.append('refresh_token', refresh_token);
    requestBody.append('client_id', process.env.ZOHO_CLIENT_ID);
    requestBody.append('client_secret', process.env.ZOHO_CLIENT_SECRET);
    requestBody.append('grant_type', 'refresh_token');

    axios.post(`${Accounts_URL}/oauth/v2/token`, requestBody, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(response => {
        const responseData = response.data;
        console.log('Response from refreshing token:', responseData);
        access_token = responseData.access_token;
    })
    .catch(error => {
        console.error('Error refreshing access token: ', error.message);
    });
}

// Initialize access token when server starts
initializeAccessToken();

// Route to create a new order
app.post('/', (req, res) => {
    const data = req.body;
    console.log("Amount: ", data.amount);

    const options = {
        amount: data.amount,  // amount in the smallest currency unit
        currency: "INR",
    };

    razorpayInstance.orders.create(options, (err, order) => {
        if (err) {
            console.error("Error creating order: ", err);
            return res.status(500).json({ message: 'Error creating order' });
        }
        res.status(200).json({ orderid: order.id, amount: data.amount });
        console.log("Order created: ", order);
    });
});

// Route to handle webhook responses
app.post('/webhook', async (req, res) => {
    const webhookResponse = req.body;
    console.log("Webhook response received: ", webhookResponse);

    const paymentData = webhookResponse.payload.payment.entity;
    console.log("Payment entity data: ", paymentData);

    let name = paymentData.notes.first_name + " " + paymentData.notes.last_name;
    if (paymentData.card !== undefined) {
        name = paymentData.card.name;   
    }

    const email = paymentData.email;
    const contact = paymentData.contact;
    const amount = paymentData.amount;

    const recordObject = {
        'Last_Name': name,
        'Email': email,
        'Phone': contact,
        'Amount': amount,
    };

    console.log("Record Object being sent to Zoho CRM: ", recordObject);

    const recordArray = [recordObject];
    const requestBody = {
        'data': recordArray,
        'trigger': []
    };

    const headers = {
        Authorization: "Zoho-oauthtoken " + access_token
    };

    try {
        const response = await axios.post(`https://zohoapis.in/crm/v2/Leads`, requestBody, { headers });
        console.log("Zoho CRM response: ", response.data.data);
    } catch (error) {
        console.error("Error sending POST request to Zoho CRM Leads API: ", error.message);
    }

    res.status(200).json({ message: 'Success' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
