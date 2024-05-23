# Kivio Internship Hiring Challenge

### Backend Integration with Razorpay and Zoho CRM
**Objective**: Implement a backend that handles payments via Razorpay, captures them through a webhook, and stores the details as leads in Zoho CRM.

**Resources**:
- [Razorpay API Documentation](https://razorpay.com/docs/)
- [Setting up Webhooks in Razorpay](https://razorpay.com/docs/webhooks/)
- [Zoho CRM API](https://www.zoho.com/crm/developer/docs/api/v2/)
- [Express.js](https://expressjs.com/)


### Assignment Details

I have implemented a backend service which is integrated with Zoho CRM and Razorpay.

### Workflow

1. First user will click the Pay button on the frontend, this will create a Razorpay order for the specified amount.

2. The user then proceeds with the payment.

3. Once the payment is compelted successfully, the the transactions details are added to the request payload and this is order is migrated to Zoho CRM as a lead for that user.

### Assumptions

For the purpose of this project, I have only implemented payment service and Lead creation service in the backend, as mentioned in the assignment.

### Setup and Installation

To run this project, follow the given steps:-

1. Create a account on Razorpay and generate `API key` and `API secret`.

2. Create a account on Zoho CRM and Zoho API Console and generate a client `Client ID`, `Client Secret`, `Refresh Token`, and `Access Token`.

3. Copy the `.env.example` into `.env` and populate the variables.

4. Install the required packages
```
npm install
```

5. Run the following command to start the server
```
npm start
```

Additionally, you can run the `sample.index.html` to test your setup. You need to fill the following details to run the webpage

```
BACKEND URL
USER FIRST NAME
USER LAST NAME
USER EMAIL
USER PHONE
RAZORPAY CLIENT ID
SAMPLE NAME
SAMPLE DESCRIPTION
```

Out of these `BACKEND_URL` and `RAZORPAY_CLIENT_ID` is mandatory.

Upon clicking on the `Pay Now` button, a razorpay prompt will open and you should be able to if your account is activated and runnning. If everything is configured correctly, these details and additional details generated from razorpay will be added as Leads to Zoho CRM.

### Contributor

This service was written by Paramjeet Kaur Matharu for the Kivio Internship Hiring Challange.