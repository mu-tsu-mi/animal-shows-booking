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
    const futureBookings = await Booking
        .find({
            animalShow: show,
            user: req.user, 
            showDate: {$gte: today}
        })
        .sort({ showDate:'ascending' })
        .exec();

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
    const futureBookings = await Booking
    .find({
        animalShow: show,
        user: req.user, 
        showDate: {$gte: today}
    })
    .sort({ showDate:'ascending' })
    .exec();

    if(dateCombined.toISOString() < today.toISOString()) {
        res.render('./animal-zones/animal-show', { errorMsg: "Invalid date. Please book for future date.", show, futureBookings })
        return
    }
    
    const startOfDay = new Date(dateAndTime)
    startOfDay.setHours(0, 0, 0, 0)
    const endOfDay = new Date(dateAndTime)
    endOfDay.setHours(23, 59, 59, 999)

    const existingBooking = await Booking.findOne({
        animalShow: show,
        user: req.user, 
        showDate: {
            $gte: startOfDay,
            $lt: endOfDay
        }
    })
    .exec();
    
    if(existingBooking) {
        res.render('./animal-zones/animal-show', { errorMsg: "You already booked for the date. Please book for a different date.", show, futureBookings })
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