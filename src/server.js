import express, {
  raw
} from 'express';
import cors from 'cors';
import Instance from './razorpay/RazorpayInstance.js';
import CreateOrder from './razorpay/CreateOrder.js';
import GenerateLead from './zoho/GenerateLead.js';
import dotenv from 'dotenv';

const app = express();
const CORS = cors()
app.use(CORS);
app.use(express.json())
dotenv.config()
app.get('/', (req, res) => {
  res.send('Backend Integration with Razorpay and Zoho CRM');
});

app.get('/zoho', (req, res) => {
  res.send("PING: ZOHO SUCCESS");
});

app.get('/razorpay', (req, res) => {
  res.send("PING: RAZORPAY SUCCESS");
});

app.post('/order', async (req, res) => {
  // we will update this and get user via JWT in production
  const user = {
    "firstName": req.body.user.firstName,
    "lastName": req.body.user.lastName,
    "email": req.body.user.email,
    "phone": req.body.user.phone,
  }
  const amount = req.body.amount;
  const instance = Instance();
  const order = CreateOrder(instance, amount, user).then((result) => {
    res.send({
      "order": result,
    });
  }).catch((err) => {
    console.log(err);
  });
});

app.post("/lead", (req, res) => {
  const order = req.body.order
  console.log(order)
  const razorpayPaymentResponse = req.body.razorpayPaymentResponse
  GenerateLead(order, razorpayPaymentResponse).then(() => {
    res.sendStatus(200);
  })
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});