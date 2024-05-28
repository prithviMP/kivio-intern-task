const express = require('express');
const bodyParser = require('body-parser');
const paymentRoutes = require('./routes/paymentRoutes');
const webhookRoutes = require('./routes/webhookRoutes');

require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/payment', paymentRoutes);
app.use('/webhook', webhookRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
