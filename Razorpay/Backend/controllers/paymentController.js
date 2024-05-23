import { serverInstance } from "../server.js";
import crypto from "crypto";
import { PaymentModel } from "../models/paymentModel.js";

export const initiateCheckout = async (req, res) => {
  const paymentDetails = {
    amount: Number(req.body.amount * 100), // Convert to smallest currency unit
    currency: "INR",
  };
  const order = await serverInstance.orders.create(paymentDetails);

  res.status(200).json({
    success: true,
    order,
  });
};

export const confirmPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(payload)
    .digest("hex");

  const paymentIsValid = generatedSignature === razorpay_signature;

  if (paymentIsValid) {
    // Insert the payment record into the database
    await PaymentModel.create({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
    });

    // Redirect to the payment success page
    res.redirect(`http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`);
  } else {
    res.status(400).json({
      success: false,
      message: 'Payment verification failed.'
    });
  }
};
