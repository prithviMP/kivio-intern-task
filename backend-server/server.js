const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

const Razorpay = require('razorpay');
var instance = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });

const Accounts_URL = 'https://accounts.zoho.in';

let access_token = null;
let refresh_token = null;

// Route to create a new order
app.post('/', (req, res) => {
    const data = req.body;
    console.log("Amount: ", data.amount);

    var options = {
        amount: data.amount,  // amount in the smallest currency unit
        currency: "INR",
    };

    instance.orders.create(options, function(err, order) {
        res.status(200).json({ orderid: order.id, amount: data.amount });
        console.log("Order: ", order);
    });
});

// Route to handle webhook responses
app.post('/webhook', async (req, res) => {
    const webhookResponse = req.body;
    console.log("Webhook response: ", webhookResponse);

    const paymentData = webhookResponse.payload.payment.entity;
    console.log("Webhook response payment entity: ", paymentData);

    let name = paymentData.notes.first_name + " " + paymentData.notes.last_name;
    // Use card information if available
    if (paymentData.card != undefined) {
        name = paymentData.card.name;   
    }

    let email = paymentData.email;
    let contact = paymentData.contact;
    let amount = paymentData.amount;
    
    let requestBody = {};
    let recordArray = [];
    
    let recordObject = {
        'Last_Name': name,
        'Email': email,
        'Phone': contact,
        'Amount': amount,
    }
    
    recordArray.push(recordObject);
    requestBody['data'] = recordArray;
    requestBody['trigger'] = [];
    
    let headers = {
        Authorization : "Zoho-oauthtoken " + access_token
    };

    // Sending a POST request to Zoho CRM API to create a new lead
    axios.post(`https://zohoapis.in/crm/v2/Leads`, requestBody, { headers })
        .then(response => {
            console.log("Zoho CRM response: ", response.data.data);
        })
        .catch(error => {
            console.error("Error sending POST request to Zoho CRM Leads API: ", error.message);
        });

    res.status(200).json({ message: 'Success' });
});

async function initializeAccessToken() {
    const formData = new FormData();

    formData.append('grant_type', 'authorization_code');
    formData.append('client_id', process.env.ZOHO_CLIENT_ID);
    formData.append('client_secret', process.env.ZOHO_CLIENT_SECRET);
    formData.append('code', process.env.ZOHO_AUTH_TOKEN);
    formData.append('redirect_uri', 'https://kivio-intern-task.onrender.com');

    // Sending a POST request to Zoho Accounts API to get the access token
    const response = await axios.post(`${Accounts_URL}/oauth/v2/token`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });

    const responseData = response.data;
    console.log("Zoho CRM auth request response: ", responseData);
    console.log("Zoho CRM access token: ", responseData.access_token);
    access_token = responseData.access_token;
    refresh_token = responseData.refresh_token;

    setInterval(refreshAccessToken, 3000000);
}

function refreshAccessToken() {
    const requestBody = {
        refresh_token,
        client_id,
        client_secret,
        grant_type: 'refresh_token'
    };

    // Sending a POST request to Zoho Accounts API to refresh the access token
    axios.post(`${Accounts_URL}/oauth/v2/token`, requestBody)
        .then(response => {
            const responseData = response.data;
            console.log('Response from refreshing token:', responseData);
            access_token = responseData.access_token;
        })
        .catch(error => {
            console.error('Error sending POST request for refreshing token: ', error.message);
        });
}

initializeAccessToken();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});