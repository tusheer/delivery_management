const express = require('express');

const app = express();

const mongoose = require('mongoose');

const port = process.env.PORT || 4000;

const bodyParser = require('body-parser');

const _require = require('./middleware/origin');

const { origin } = _require;

const User = require('./model/user.js');

app.use(origin);
const tuhser = 'hi';
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.get('/', (req, res) => {
    let user;
    return regeneratorRuntime.async((_context) => {
        while (1) {
            switch ((_context.prev = _context.next)) {
                case 0:
                    user = new User({
                        name: 'HI',
                        email: 'jaanelamtush@gmail.com',
                        password: 'Tusher',
                    });
                    _context.next = 3;
                    return regeneratorRuntime.awrap(user.save());

                case 3:
                    res.send('Hello World!');

                case 4:
                case 'end':
                    return _context.stop();
            }
        }
    });
});
app.get('/all', (req, res) => {
    let user;
    return regeneratorRuntime.async((_context2) => {
        while (1) {
            switch ((_context2.prev = _context2.next)) {
                case 0:
                    _context2.next = 2;
                    return regeneratorRuntime.awrap(User.find());

                case 2:
                    user = _context2.sent;
                    res.send(user);

                case 4:
                case 'end':
                    return _context2.stop();
            }
        }
    });
});
mongoose
    .connect('mongodb://localhost:27017/test', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(app.listen(port, () => console.log('game on')))
    .catch((err) => {
        console.log(err);
    });
