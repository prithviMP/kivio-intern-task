import mongoose from 'mongoose';

const razorpayPaymentSchema = new mongoose.Schema({
  orderId: {  // Razorpay's order ID
    type: String,
    required: true
  },
  paymentId: {  // Razorpay's payment ID
    type: String,
    required: true
  },
  signature: {  // Signature to verify the payment
    type: String,
    required: true
  }
});

export const PaymentModel = mongoose.model('PaymentModel', razorpayPaymentSchema);
