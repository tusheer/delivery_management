const mongoose = require('mongoose');

const { Schema } = mongoose;

const ordersSchema = new Schema(
    {
        status: {
            type: String,
            default: 'processing',
        },
        assignBy: {
            type: Schema.Types.ObjectId,
            ref: 'users',
        },

        phone: {
            type: String,
            required: true,
            minLength: 11,
        },
        address: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        quantity: {
            type: String,
            required: true,
        },
        totalAmount: {
            type: String,
            required: true,
        },

        cashonDelivery: {
            type: Boolean,
            default: true,
        },
        order_id: {
            type: String,
            require: true,
            unique: true,
        },
    },
    { timestamps: true }
);
const Order = mongoose.model('orders', ordersSchema);
module.exports = Order;
