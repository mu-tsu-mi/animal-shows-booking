const express = require('express');
const router = express.Router();
const bookingCtrl = require('../controllers/bookings');

router.get('/', bookingCtrl.showBooking)

module.exports = router;