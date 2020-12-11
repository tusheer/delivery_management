const express = require('express');

const app = express();
const mongoose = require('mongoose');

const port = process.env.PORT || 4000;
const bodyParser = require('body-parser');
const { origin } = require('./middleware/origin');
const userRoute = require('./route/user');

app.use(origin);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/api/user', userRoute);
mongoose
    .connect('mongodb://localhost:27017/test', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(app.listen(port, () => console.log('game on')))
    .catch((err) => {
        console.log(err);
    });
