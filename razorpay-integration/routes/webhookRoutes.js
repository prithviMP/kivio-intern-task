const express = require("express");
const webhookController = require("../controllers/webhookController");

const router = express.Router();

// POST request handler for webhook endpoint
router.post("/razorpay", webhookController.webhook);

router.get("/", (req, res) => {
  res.status(404).send("Webhook endpoint does not support GET requests");
});

router.post("/test", (req, res) => {
  console.log("Success");
  res.status(200).send("Success");
});

module.exports = router;
