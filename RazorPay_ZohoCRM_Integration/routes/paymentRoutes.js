const express = require('express');
const { createPaymentLink } = require('../controllers/paymentController');
const router = express.Router();

router.post('/', createPaymentLink);

module.exports = router;
