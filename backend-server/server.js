const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

const Razorpay = require('razorpay');
var instance = new Razorpay({ key_id: 'rzp_test_3a5uPbXoIibKOd', key_secret: 'FIcp6dIYVCbv5IRCgjYZ7n73' })

// Define a route to handle incoming GET requests
// app.get('/', (req, res) => {

//     res.send('Hello World!');
// });

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
})
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