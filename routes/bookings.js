const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../config/ensureLoggedIn');
const bookingCtrl = require('../controllers/bookings');

router.get('/', ensureLoggedIn, bookingCtrl.showBookings)
router.get('/:id/edit', ensureLoggedIn, bookingCtrl.showBookingEdit)
router.put('/:id/edit', ensureLoggedIn, bookingCtrl.saveBookingChange)
router.delete('/:id', ensureLoggedIn, bookingCtrl.deleteBooking)

module.exports = router;