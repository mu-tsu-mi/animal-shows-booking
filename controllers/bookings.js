const Booking = require('../models/booking');

module.exports = {
    showBooking
}

async function showBooking(req, res) {
    const bookings = await Booking.find({ user: req.user }).populate('animalShow').exec();
    
    res.render('./bookings', { bookings })
}