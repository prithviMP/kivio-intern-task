const express = require("express");
const paymentController = require("../controllers/paymentController");

const router = express.Router();

router.post("/create-order", paymentController.createOrder);
router.post("/create-payment-link", paymentController.createPaymentLink);
router.get("/payment-callback", paymentController.paymentCallback);

module.exports = router;
