const express = require('express');
const router = express.Router();
const { getPDFhandler } = require('../controllers/pdfController');

// router.param('id', checKID);

router.route('/generate').get(getPDFhandler);


module.exports = router;