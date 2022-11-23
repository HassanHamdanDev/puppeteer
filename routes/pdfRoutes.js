const express = require('express');
const router = express.Router();
const { getPDFhandler } = require('../controllers/pdfController');

// router.param('id', checKID);

router.route('/generate').post(getPDFhandler);


module.exports = router;