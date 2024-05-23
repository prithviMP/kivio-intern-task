export default async function CreateOrder(instance, amount, user) {
    var options = {
        amount: amount * 100, // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11",
        notes: {
            "firstName": user.firstName,
            "lastName": user.lastName,
            "email": user.email,
            "phone": user.phone,
        }
    };

    return new Promise((resolve, reject) => {
        instance.orders.create(options, function(err, order) {
            if (err) {
                reject(err);
            } else {
                resolve(order);
            }
        });
    });
}