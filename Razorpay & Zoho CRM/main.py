import razorpay
from flask import Flask, render_template, request
import requests, json

app = Flask(__name__, static_folder="static", static_url_path='')

@app.route('/')
def app_create():
    return render_template('app.html')

@app.route('/pay', methods=['POST'])
def pay():
    global payment, name, phone, email
    name = request.form.get('username')
    phone = request.form.get('phone')
    email = request.form.get('email')
    amount = request.form.get('amount')
    try:
        amount = int(amount)
    except:
        return render_template('app.html')
    client = razorpay.Client(auth=("rzp_test_ef3y63JfBsQBwf","g58k3VA4IGo9WvkXhpEFOs6O"))
    
    data = {"amount":100*amount, "currency": "INR", "receipt": "#111"}
    payment = client.order.create(data=data)
    return render_template('pay.html', payment=payment)

@app.route('/create-leads', methods=['POST'])
def create_leads():
    data = request.json
    print(data)
    data = {
        "Last_Name": name,
        "Email": email,
        "Phone": phone,
        "Company":"Kivio",
        "Payment_Details": {
            "amount": payment["amount"]/100,
            "currency": payment["currency"],
            "reciept_id": payment["receipt"],
            "payment_id": data['razorpay_payment_id'],
            "order_id": data["razorpay_order_id"],
            "signature": data['razorpay_signature']
        }
    }
    request_json = {
        "data": [
            data       
        ],
        "result": {
            "fields": [
            "Email"
            ],
            "message": True,
            "tasks": True
        }
    }
    
    url = 'https://zohoapis.in/crm/v2/Leads'
    access_token = '1000.3a0ddf923ab74a7b1bbb323e51af43ba.ce04c5dd21c0ccdc4583a4ad15595c02'
    
    headers = {"Authorization" : "Zoho-oauthtoken " + access_token,}
    
    response = requests.post(url, json=request_json, headers=headers)
    
    print(response.status_code)
    print(response.text)
    
    return render_template('app.html')

if __name__ == '__main__':
    app.debug = True
    app.run()
    