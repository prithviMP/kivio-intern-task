const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
let octokit = null;

async function importOctokit() {
    octokit = await import('@octokit/core');
}

importOctokit();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

const Razorpay = require('razorpay');
var instance = new Razorpay({ key_id: 'rzp_test_3a5uPbXoIibKOd', key_secret: 'FIcp6dIYVCbv5IRCgjYZ7n73' });

const Accounts_URL = 'https://accounts.zoho.in';
const client_id = '1000.TF143AGTR341LHW9YTECNNALGZRXIA';
const client_secret = 'b78477796133112188a475790b866fe06e5296742d';

let access_token = null;
let refresh_token = null;

app.post('/', (req, res) => {
    const data = req.body;
    console.log(data.amount);

    var options = {
        amount: data.amount,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
    };

    instance.orders.create(options, function(err, order) {
        res.status(200).json({ orderid: order.id, amount: data.amount });
        console.log(order);
    });
});

app.post('/webhook', async (req, res) => {
    const webhookResponse = req.body;
    let email = webhookResponse.payload.payment.entity.email;
    let contact = webhookResponse.payload.payment.entity.contact;
    let amount = webhookResponse.payload.payment.entity.amount;
    let name = null;

    let requestBody = {};
    let recordArray = [];
    
    let recordObject = {
        'Email': email,
        'Phone': contact,
        'Amount': amount
    }
    if (webhookResponse.payload.payment.entity.card != undefined) {
        name = webhookResponse.payload.payment.card.name;
    }
    if (name != null || name != undefined) {
        recordObject['First Name'] = name;
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

async function fetchToken() {
    const { Octokit } = await import('@octokit/core');

    const octokit = new Octokit({
        auth: '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'
    });
    
    const response = await octokit.request('GET /gists/{gist_id}', {
        gist_id: 'e89cee71842f7bdd462c1fc984f452be',
        headers: {
        'X-GitHub-Api-Version': '2022-11-28'
        }
    });
    
    return response.data.files['gistfile1.txt'].content;
}

async function initializeAccessToken() {
    const formData = new FormData();
    formData.append('grant_type', 'authorization_code');
    formData.append('client_id', client_id);
    formData.append('client_secret', client_secret);
    formData.append('redirect_uri', 'https://kivio-intern-task.onrender.com');
    let token = await fetchToken();
    console.log("gist: ", token);
    formData.append('code', token);

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