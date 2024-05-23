import express from 'express';
import {
  initiateCheckout,
  confirmPayment,
} from '../controllers/paymentController.js';

const paymentRouter = express.Router();

paymentRouter.post('/checkout', initiateCheckout);

paymentRouter.post('/payment-verification', confirmPayment);

export default paymentRouter;
