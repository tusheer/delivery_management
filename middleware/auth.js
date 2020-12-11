const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Get token from header
    const token = req.header('Authorization');

    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token.split()[1], 'developedbytusher');

        req.body.user = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
