const { validationResult, body } = require('express-validator');

const user = {};

user.CreateUser = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    return res.send(req.body);
};

user.validate = (type) => {
    switch (type) {
        case 'createUser': {
            return [body('name', 'user doesnt exists').exists()];
        }
        default: {
            return [];
        }
    }
};

module.exports = user;
