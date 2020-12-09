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
const User = mongoose.model('users', usersSchema);
module.exports = User;
