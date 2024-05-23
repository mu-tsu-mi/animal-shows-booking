const Show = require('../models/show')
const Booking = require('../models/booking')

module.exports = {
    showAnimalShow,
    bookAnimalShow
}

async function showAnimalShow(req, res) {
    const id = req.params.id
    const show = await Show.findById(id).exec();
    const today = new Date();
    const allBookings = await Booking.find({ animalShow: show, user: req.user})
        .sort({ showDate:'ascending' })
    const futureBookings = []
    allBookings.forEach((b) => {
        if(b.showDate > today) {
            futureBookings.push(b)
        } return futureBookings
    })
    res.render('./animal-zones/animal-show', { errorMsg: "", show, futureBookings })
}

async function bookAnimalShow(req, res) {
    const id = req.params.id
    const show = await Show.findById(id).exec();

    const newBooking = req.body
    newBooking.animalShow = show
    newBooking.user = req.user
    const dateAndTime = newBooking.showDate.toString().concat(' ', show.timeOfDay)
    const dateCombined = new Date(dateAndTime)
    newBooking.showDate = dateCombined
    const today = new Date()

    if(dateCombined.toISOString() < today.toISOString()) {
        const bookings = await Booking.find({ animalShow: show, user: req.user})
        .sort({ showDate:'ascending' })
        res.render('./animal-zones/animal-show', { errorMsg: "Invalid date. Please book for future date.", show, bookings })
        return
    }

    try {       
        await Booking.create(newBooking)
        res.redirect(`/shows/${show._id}`)
    } catch(err) {
        console.log(err)
        res.redirect(`/shows/${show._id}`, { errorMsg: err.message })
    }
}