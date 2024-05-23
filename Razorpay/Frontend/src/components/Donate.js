import React from 'react';
import './Donate.css';
// const Razorpay = require('razorpay');
// const axios = require('axios');
import axios from 'axios';

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}
// async function handleDonateClick(){
//     // <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
//     // const paymentLink = "https://checkout.razorpay.com/v1/checkout.js";
//     // window.location.href = paymentLink;
//         // const buyButton = document.getElementById('buy-now-btn');
//     const BACKEND = "http:\\127.0.0.1:5000\\";
//     const sum = 100;

//     const response = await fetch(BACKEND + '/order', {

//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         }

//         ,
//         body: JSON.stringify({

//             amount: sum,
//             user: {
//                 "firstName": "Abcd",
//                 "lastName": "efg",
//                 "email": "lalallala@gmail.com",
//                 "phone": "6262174462"
//             }
//         })
//     });

//     const responseJson = await response.json();

//     const {
//         order
//     }

//         = responseJson;

//     const razorPayOptions = {

//         key: 'apna key likhhh',
//         amount: sum,
//         currency: 'INR',
//         name: `stuv`,
//         description: `abcd`,
//         order_id: order.id,
//         handler: async function (response) {
//             // handler function when payment is successfull
//             const razorpayPaymentId = response['razorpay_payment_id'];
//             const razorpayOrderId = response['razorpay_order_id'];
//             const razorpaySignature = response['razorpay_signature'];

//             const lead = await fetch(BACKEND + "/lead", {

//                 method: 'POST',
//                 headers: {
//                     "Content-Type": "application/json"
//                 }

//                 ,
//                 body: JSON.stringify({
//                     "order": order,
//                     "razorpayPaymentResponse": response
//                 })
//             })
//         }

//         ,
//     };

//     const razorpayInstance = new Razorpay(razorPayOptions);
//     razorpayInstance.open();
//   };

  async function displayRazorpay() {
    const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
    }

    // creating a new order
    const result = await axios.post("http://localhost:3000/payment/checkout");

    if (!result) {
        alert("Server error. Are you online?");
        return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency } = result.data;

    const options = {
        key: "rzp_test_ef3y63JfBsQBwf", // Enter the Key ID generated from the Dashboard
        amount: amount.toString(),
        currency: currency,
        name: "Soumya Corp.",
        description: "Test Transaction",
        order_id: order_id,
        handler: async function (response) {
            const data = {
                orderCreationId: order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
            };

            const result = await axios.post("http://localhost:3000/payment/payment-verification", data);

            alert(result.data.msg);
        },
        prefill: {
            name: "Soumya Dey",
            email: "SoumyaDey@example.com",
            contact: "9999999999",
        },
        notes: {
            address: "Soumya Dey Corporate Office",
        },
        theme: {
            color: "#61dafb",
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
}

const Donate = () => {
  return (
    <div className="donate-section">
      <h2>Support Our Cause</h2>
      <p>Your generous donation helps us continue our mission and make a difference in the community.</p>
      <button onClick={displayRazorpay}>Donate Now</button>
    </div>
  );
};

export default Donate;
