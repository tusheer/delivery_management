const express = require('express');

const { createOrder, validate } = require('../controller/order');

const orderRoute = express.Router();

orderRoute.post('/create', validate('createOrder'), createOrder);

module.exports = orderRoute;
