# Payment and Lead Management System

This project is a Express js application designed to handle payments through Razorpay and add leads to Zoho CRM. The project is structured following the MVC architecture to ensure modularity and maintainability.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/payment-zoho-crm.git
    cd payment-zoho-crm
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

## Configuration

1. Create a `.env` file in the root of the project and add the following environment variables:

    ```env
    RAZORPAY_ID=your_razorpay_key_id
    RAZORPAY_SECRET=your_razorpay_key_secret
    WEBHOOK_SECRET=your_webhook_secret

    ZOHO_CLIENT_ID=your_zoho_client_id
    ZOHO_CLIENT_SECRET=your_zoho_client_secret
    ZOHO_REFRESH_TOKEN=your_zoho_refresh_token
    ```

   Replace the placeholder values with your actual API keys and secrets.

## Usage

1. Start the server:

    ```bash
    npm start
    ```

    For development with automatic restarts on file changes, use:

    ```bash
    npm run dev
    ```

2. Endpoints:

    - **POST /payment**: Create a payment link
        - Request Body:
            ```json
            {
                "amount": 100,
                "currency": "INR",
                "firstName": "John",
                "lastName": "Doe",
                "email": "john.doe@example.com",
                "phone": "1234567890"
            }
            ```

    - **POST /webhook**: Handle Razorpay webhooks to capture payments and create leads in Zoho CRM

## Project Structure

    .
    ├── app.js                 # Main application file
    ├── controllers            # Controllers for handling requests
    │   ├── paymentController.js
    │   └── webhookController.js
    ├── models                 # Models for handling business logic
    │   ├── paymentLink.js
    │   └── lead.js
    ├── routes                 # Routes for defining endpoints
    │   ├── paymentRoutes.js
    │   └── webhookRoutes.js
    ├── services               # Services for integrating with external APIs
    │   ├── razorpayService.js
    │   └── zohoService.js
    ├── .env                   # Environment variables
    ├── package.json           # Project metadata and dependencies
    └── README.md              # Project documentation

## Dependencies

- **Express**: A web framework for Node.js
- **Body-parser**: Middleware to parse incoming request bodies
- **Axios**: Promise-based HTTP client
- **Crypto**: Node.js built-in module for cryptographic functions
- **Razorpay**: Razorpay SDK for integrating Razorpay payment gateway
- **Dotenv**: Module to load environment variables from a `.env` file
- **Qs**: Query string parsing and stringifying
- **Nodemon**: Development tool for automatic restarts (optional)

Install all dependencies with:

```bash
npm install
