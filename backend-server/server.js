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

app.post('/webhook', async (req, res) => {
    const webhookResponse = req.body;
    console.log("Webhook response: ", webhookResponse);
    let email = webhookResponse.payload.payment.entity.email;
    let contact = webhookResponse.payload.payment.entity.contact;
    let amount = webhookResponse.payload.payment.entity.amount;
    let name = 'Test';
    if (webhookResponse.payload.payment.entity.card != undefined) {
        name = webhookResponse.payload.payment.card.name;
    }

    let requestBody = {};
    let recordArray = [];
    
    let recordObject = {
        'Email': email,
        'Phone': contact,
        'Amount': amount,
        'Last_Name': name,
    }
    
    recordArray.push(recordObject);
    requestBody['data'] = recordArray;
    requestBody['trigger'] = [];
    
    let headers = {
        Authorization : "Zoho-oauthtoken " + access_token
    };

    axios.post(`https://zohoapis.in/crm/v2/Leads`, requestBody, { headers })
        .then(response => {
            console.log("Zoho CRM response: ", response.data.data);
        })
        .catch(error => {
            console.error("Error sending POST request: ", error.message);
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

    const response = await axios.post(`${Accounts_URL}/oauth/v2/token`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });

    const responseData = response.data;
    console.log("Zoho CRM auth request response: ", responseData);
    console.log("Token: ", responseData.access_token);
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

    axios.post(`${Accounts_URL}/oauth/v2/token`, requestBody)
        .then(response => {
            const responseData = response.data;
            console.log('Response from refreshing token:', responseData);
            access_token = responseData.access_token;
        })
        .catch(error => {
            console.error('Error sending POST request for refreshing token:', error.message);
        });
}

initializeAccessToken();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});