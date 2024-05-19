const Booking = require('../models/booking');

module.exports = {
    showBookings
}

async function showBookings(req, res) {
    const bookings = await Booking.find({ user: req.user }).populate('animalShow').exec();
    res.render('./bookings', { bookings })
}