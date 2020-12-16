const { validationResult, body, check } = require('express-validator');
const Order = require('../model/order');
const User = require('../model/user');

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
        const assingUser = await User.findById(req.body.assignBy);
        assingUser.currentAssing = orderCreate._id;
        // I dont think not to need await here to save aissgn user.
        assingUser.save();
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
                check('order_id')
                    .exists({ checkFalsy: true })
                    .withMessage('Order id is must be require'),
                check('type').exists().withMessage('Type is must be required'),
                body('address').exists({ checkFalsy: true }),
                check('phone')
                    .matches(/(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/)
                    .withMessage('Number must be valid BD number'),
                check('name').exists({ checkFalsy: true }).withMessage('Name is must be require'),
                check('quantity').isNumeric().withMessage('Quantity is must be number'),
                check('totalAmount').isNumeric().withMessage('Total ammount must be number'),

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
