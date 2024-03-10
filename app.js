// IMPORTING BASE THINGS
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const hpp = require('hpp');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./app/route/api');
const {dbUri} = require('./app/config/config');

// SECURITY IMPLEMENT AND OTHER IMPLEMENT
app.use(helmet());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(hpp());

// RATE LIMITING
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 1000 * 60 * 15,
    limit: 100,
    standardHeaders: 'draft-7',
    legacyHeaders: false
})
app.use(limiter);

// DATABASE CONNECTION
mongoose.connect(dbUri, {autoIndex: true})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error(err));

// ROUTING STARTED
app.use('/api/v1', router);
// undefined routes
app.use('*', (req, res) => {
    res.status(404).json({status: '404', message: 'Route not Found'});
});

module.exports = app;