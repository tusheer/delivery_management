const express = require('express');
// const { body } = require('express-validator');
const { CreateUser, validate } = require('../controller/user');

const userRoute = express.Router();

userRoute.post('/signup', validate('createUser'), CreateUser);

module.exports = userRoute;
