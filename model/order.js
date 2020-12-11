const mongoose = require('mongoose');

const { Schema } = mongoose;

const ordersSchema = new Schema(
    {
        oderId: {
            type: String,
            required: true,
            unique: true,
        },
        status: {
            type: String,
            default: 'processing',
        },
        assignBy: {
            type: Schema.ObjectId,
            ref: 'users',
        },
        type: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
            minLength: 11,
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
    },
    { timestamps: true }
);
const Order = mongoose.model('orders', ordersSchema);
module.exports = Order;
