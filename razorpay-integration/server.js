require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const paymentRoutes = require("./routes/paymentRoutes");
const webhookRoutes = require("./routes/webhookRoutes");

const app = express();
app.use(bodyParser.json());

app.use("/payments", paymentRoutes);
app.use("/webhooks", webhookRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
