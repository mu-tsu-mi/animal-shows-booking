const Booking = require('../models/booking');

module.exports = {
    showBookings,
    showBookingEdit,
    saveBookingChange,
    deleteBooking
}

async function showBookings(req, res) {
    const bookings = await Booking.find({ user: req.user }).populate({
        path: 'animalShow',
        populate: {
            path:'animal'
        }
    }).exec();
    res.render('bookings/index', { bookings })
}

async function showBookingEdit(req, res) {
    const booking = await Booking.findById(req.params.id)
    res.render('bookings/edit', { booking })
}

async function saveBookingChange(req, res) {
    const booking = await Booking.findById(req.params.id)
    booking.showDate = req.body.showDate
    booking.numberOfAdults = req.body.numberOfAdults
    booking.numberOfChildren = req.body.numberOfChildren
    await booking.save()
    res.redirect('/bookings')
}

async function deleteBooking(req, res) {
    await Booking.deleteOne({ _id: req.params.id })
    res.redirect('/bookings')
}