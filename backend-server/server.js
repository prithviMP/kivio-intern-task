const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;



let requestBody = {};
let recordArray = [];

const Razorpay = require('razorpay');
var instance = new Razorpay({ key_id: 'rzp_test_3a5uPbXoIibKOd', key_secret: 'FIcp6dIYVCbv5IRCgjYZ7n73' });

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

app.post('/webhook', (req, res) => {
    const data = req.body;
    if (data.event != "payment.captured") {
        return;
    }
    let url = 'https://www.zohoapis.in/crm/v2/Leads';

    const formData = new FormData();

    formData.append('grant_type', 'authorization_code');
    formData.append('client_id', '1000.TF143AGTR341LHW9YTECNNALGZRXIA');
    formData.append('client_secret', 'b78477796133112188a475790b866fe06e5296742d');
    formData.append('redirect_uri', 'https://kivio-intern-task.onrender.com');
    formData.append('code', '1000.12fa99104a5ed604c77b28a3ac4b9123.1b4e2d93c7152eeeefa121c6dc20aff9');

    axios.post("https://accounts.zoho.in/oauth/v2/token", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
        .then(response => {
            var data = response.data;
            console.log("Zoho CRM token: ", data);
            var token = data.access_token;
            console.log("Token: ", token);
            let headers = {
                Authorization : "Zoho-oauthtoken " + token
            };
            let recordObject = {
                'Amount': '100'
            };
            recordArray.push(recordObject);
            requestBody['data'] = recordArray;
            requestBody['trigger'] = [];
        
            axios.post(url, requestBody, { headers })
                .then(data => {
                    console.log("Zoho CRM response: ", data);
                })
                .catch(error => {
                    console.error("Error sending POST request: ", error.message);
                });
        })
        .catch(error => {
            console.error("Error getting oauth token: ", error.message);
        })
});

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