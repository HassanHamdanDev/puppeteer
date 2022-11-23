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

app.get('/', (req, res) => {
    res.status(200).json({ message: 'hello', app: 'puppeteer' });
});

app.use('/api/pdf', pdfRoutes);


module.exports = app;