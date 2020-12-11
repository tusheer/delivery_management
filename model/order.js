const mongoose = require('mongoose');

const { Schema } = mongoose;

const ordersSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
        unique: true,
        required: true,
        minLength: 11,
    },
    active: {
        type: Boolean,
    },
    password: {
        type: String,
        minLength: 6,
    },
});
const Order = mongoose.model('orders', ordersSchema);
module.exports = Order;
