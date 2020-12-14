const mongoose = require('mongoose');

const { Schema } = mongoose;

const usersSchema = new Schema({
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
    currentAssing: {
        type: Schema.Types.ObjectId,
        ref: 'orders',
    },
    orders: [
        {
            _id: Schema.ObjectId,
            submitTime: {
                type: Date,
                default: Date.now(),
                ref: 'orders',
            },
        },
    ],
});
const User = mongoose.model('users', usersSchema);
module.exports = User;
