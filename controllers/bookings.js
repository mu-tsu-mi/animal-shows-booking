const Booking = require('../models/booking');

module.exports = {
    showBookings,
    showBookingEdit,
    saveBookingChange,
    deleteBooking
}

async function showBookings(req, res) {
    const bookings = await Booking
        .find({ user: req.user })
        .populate('animalShow')
        .sort({ showDate:'ascending' })
        .exec();
    res.render('bookings/index', { bookings })
}

async function showBookingEdit(req, res) {
    const booking = await Booking
        .findById(req.params.id)
        .populate('animalShow')
        .exec();
    res.render('bookings/edit', { errorMsg: "", booking })
}

async function saveBookingChange(req, res) {
    const booking = await Booking
        .findById(req.params.id)
        .populate('animalShow')
        .exec();
    
    booking.numberOfAdults = req.body.numberOfAdults
    booking.numberOfChildren = req.body.numberOfChildren
    
    const dateAndTime = req.body.showDate.toString().concat(' ', booking.animalShow.timeOfDay)
    const dateCombined = new Date(dateAndTime)
    booking.showDate = dateCombined
    const today = new Date()

    if(dateCombined.toISOString() < today.toISOString()) {
        res.render('./bookings/edit', { errorMsg: "Invalid date. Please book for future date.", booking })
        return
    }

    const startOfDay = new Date(dateAndTime)
    startOfDay.setHours(0, 0, 0, 0)
    const endOfDay = new Date(dateAndTime)
    endOfDay.setHours(23, 59, 59, 999)

    const existingBooking = await Booking.findOne({
        animalShow: booking.animalShow,
        user: req.user, 
        showDate: {
            $gte: startOfDay,
            $lt: endOfDay
        }
    })
    .exec();
    
    if(existingBooking) {
        res.render('./bookings/edit', { errorMsg: "You already booked for the date. Please book for a different date.", booking })
        return
    }

    try { 
        await booking.save()
        res.redirect('/bookings')
    } catch(err) {
        console.log(err)
        res.redirect('/bookings', { errorMsg: err.message })
    }
}

async function deleteBooking(req, res) {
    try {
        await Booking.deleteOne({ _id: req.params.id })
        res.redirect('/bookings')
    } catch(err) {
        console.log(err)
        res.redirect('/bookings', { errorMsg: err.message })
    }
}