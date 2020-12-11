const { validationResult, body } = require('express-validator');
const jwt = require('jsonwebtoken');
const { createOtp, verifyOtp } = require('../lib/otp');
const User = require('../model/user');

const user = {};

user.CreateUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, phone } = req.body;
    const hash = createOtp(phone);

    try {
        const newUser = new User({ name, phone });
        await newUser.save();
        return res.send({ hash });
    } catch (e) {
        return res.status(422).json({ error: 'Phone number already exit' });
    }
};

user.signin = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { phone } = req.body;
    const hash = createOtp(phone);
    try {
        const userObj = await User.findOne({ phone });
        if (userObj._id) {
            return res.send({ hash });
        }
        res.status(400).json({ message: 'User not found' });
    } catch (error) {
        res.status(400).json({ message: 'User not found' });
    }
};

user.VerifyOtp = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { phone, hash, otp } = req.body;
    const isMatch = verifyOtp(phone, hash, otp);
    try {
        if (isMatch) {
            const userObj = await User.findOne({ phone });

            const token = jwt.sign({ ...userObj }, 'developedbytusher');
            res.send({ _id: userObj._id, name: userObj.name, phone: userObj.phone, token });
        } else {
            res.status(422).json({ error: 'Otp is not match' });
        }
    } catch (e) {
        return res.status(422).json({ error: 'Token time is over' });
    }
};

user.validate = (type) => {
    switch (type) {
        case 'createUser': {
            return [
                body('name', 'user doesnt exists').exists(),
                body('phone').exists().isLength({ min: 11 }),
            ];
        }
        case 'verifyOtp': {
            return [
                body('otp').exists().isLength({ min: 6, max: 6 }),
                body('hash').exists(),
                body('phone').exists().isLength({ min: 11 }),
            ];
        }
        case 'signin': {
            return [body('phone').exists().isLength({ min: 11 })];
        }
        default: {
            return [];
        }
    }
};

module.exports = user;
