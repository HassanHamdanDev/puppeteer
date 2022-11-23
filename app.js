'use strict';

const express = require('express');
const app = express();
const morgan = require('morgan');
const pdfRoutes = require('./routes/pdfRoutes');

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    //     response.setHeader("Access-Control-Allow-Origin", "*");
    // response.setHeader("Access-Control-Allow-Credentials", "true");
    // response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    // response.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.header({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Credentials': 'true',
    });
    next();
});

app.get('/', (req, res) => {
    res.status(200).json({ message: 'hello', app: 'puppeteer' });
});

app.use('/api/pdf', pdfRoutes);


module.exports = app;