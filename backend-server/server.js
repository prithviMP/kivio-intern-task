const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

let url = 'https://www.zohoapis.com/crm/v2/Leads';
let headers = {
    Authorization : "Zoho-oauthtoken 1000.ed1e9766781f62d244dfec06b03ce3f0.10af38c9a2a2e4124c7c1a965818be78"
};

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
    let recordObject = {
        'Amount': '100'
    };
    recordArray.push(recordObject);
    requestBody['data'] = recordArray;
    requestBody['trigger'] = [];

    let requestDetails = {
        method : "POST",
        headers : headers,
        body : JSON.stringify(requestBody),
        encoding: "utf8",
        throwHttpErrors : false
    };

    fetch(url, requestDetails)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log("Zoho CRM response: ", data);
        })
        .catch(error => {
            console.error("Error sending POST request: ", error.message);
        });
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