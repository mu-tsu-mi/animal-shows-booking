const express = require('express');
const router = express.Router();
const bookingCtrl = require('../controllers/bookings');

router.get('/', bookingCtrl.showBookings)
router.get('/:id/edit', bookingCtrl.showBookingEdit)
router.put('/:id/edit', bookingCtrl.saveBookingChange)
router.delete('/:id', bookingCtrl.deleteBooking)

module.exports = router;