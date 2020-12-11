const express = require('express');
// const { body } = require('express-validator');
const { CreateUser, validate, VerifyOtp, signin } = require('../controller/user');

const userRoute = express.Router();

userRoute.post('/signup', validate('createUser'), CreateUser);
userRoute.post('/signin', validate('signin'), signin);
userRoute.post('/otp-verify', validate('verifyOtp'), VerifyOtp);

module.exports = userRoute;
