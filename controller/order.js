const { validationResult, body } = require('express-validator');
const Order = require('../model/order');

const order = {};

order.createOrder = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const orderCreate = new Order({
            ...req.body,
        });
        console.log(req.body);
        await orderCreate.save();
        return res.send(orderCreate);
    } catch (error) {
        return res.status(422).json({ message: 'Something is wrong' });
    }
};

order.validate = (type) => {
    switch (type) {
        case 'createOrder': {
            return [
                body('order_id').exists(),
                body('type').exists(),
                body('address').exists(),
                body('phone').exists().isLength({ min: 11 }),
                body('name').exists(),
                body('quantity').exists(),
                body('totalAmount').exists(),
                body('cashonDelivery').optional(),
                body('status').optional(),
            ];
        }
        default: {
            return [];
        }
    }
};

module.exports = order;
