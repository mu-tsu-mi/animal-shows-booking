const Booking = require('../models/booking');

module.exports = {
    showBookings,
    showBookingEdit
}

async function showBookings(req, res) {
    const bookings = await Booking.find({ user: req.user }).populate('animalShow').exec();
    res.render('bookings/index', { bookings })
}

async function showBookingEdit(req, res) {
    const booking = await Booking.findById(req.params.id)
    res.render('bookings/edit', { booking })
}