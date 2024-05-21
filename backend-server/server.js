const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

const Razorpay = require('razorpay');
var instance = new Razorpay({ key_id: 'rzp_test_3a5uPbXoIibKOd', key_secret: 'FIcp6dIYVCbv5IRCgjYZ7n73' });

const Accounts_URL = 'https://accounts.zoho.in';
const client_id = '1000.TF143AGTR341LHW9YTECNNALGZRXIA';
const client_secret = 'b78477796133112188a475790b866fe06e5296742d';

app.use(cors());
app.use(bodyParser.json());

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

let access_token = null;
let refresh_token = null;

app.post('/webhook', async (req, res) => {
    const webhookResponse = req.body;
    if (webhookResponse.event != "payment.captured") {
        return;
    }

    let email = webhookResponse.payload.payment.entity.email;
    let contact = webhookResponse.payload.payment.entity.contact;
    let amount = webhookResponse.payload.payment.entity.amount;
    let url = 'https://www.zohoapis.in/crm/v2/Leads';

    if (access_token == null) {
        const formData = new FormData();
        formData.append('grant_type', 'authorization_code');
        formData.append('client_id', client_id);
        formData.append('client_secret', client_secret);
        formData.append('redirect_uri', 'https://kivio-intern-task.onrender.com');
        formData.append('code', '1000.a16324d81765a0eb0e90dcf5ac680799.d9480c86e09f5f1d9a61279c22e4f236');

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

    let headers = {
        Authorization : "Zoho-oauthtoken " + access_token
    };

    let requestBody = {};
    let recordArray = [];

    let recordObject = {
        'Company': 'Zylker',
        'Email': email,
        'Last_Name': 'hehehe',
        'First_Name': 'Paul',
        'Lead_Status': 'Contacted',
        'Phone': contact,
        'Amount': amount
    }

    recordArray.push(recordObject);
    requestBody['data'] = recordArray;
    requestBody['trigger'] = [];

    axios.post(url, requestBody, { headers })
        .then(response => {
            console.log("Zoho CRM response: ", response.data.data);
        })
        .catch(error => {
            console.error("Error sending POST request: ", error.message);
        });
});

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

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// API signature
// {razorpayInstance}.{resourceName}.{methodName}(resourceId [, params])

// example

// instance.payments.fetch(paymentId)

// instance.payments.all({
//         from: '2016-08-01',
//         to: '2016-08-20'
//     }).then((response) => {
//         // handle success
//     }).catch((error) => {
//         // handle error
//     })

// instance.payments.all({
//     from: '2016-08-01',
//     to: '2016-08-20'
//     }, (error, response) => {
//     if (error) {
//         // handle error
//     } else {
//         // handle success
//     }
//     })




//response
// {
// "id": "order_DBJOWzybf0sJbb",
// "entity": "order",
// "amount": 50000,
// "amount_paid": 0,
// "amount_due": 39900,
// "currency": "INR",
// "receipt": "order_rcptid_11",
// "status": "created",
// "attempts": 0,
// "notes": [],
// "created_at": 1566986570
// }

// extract id value and send to checkout