const Show = require('../models/show')
const Booking = require('../models/booking')

module.exports = {
    showAnimalShow,
    bookAnimalShow
}

async function showAnimalShow(req, res) {
    const id = req.params.id
    const show = await Show.findById(id).exec();
    const bookings = await Booking.find({ animalShow: show, user: req.user})
        .sort({ showDate:'ascending' })
    res.render('./animal-zones/animal-show', { show, bookings })
}

async function bookAnimalShow(req, res) {
    const id = req.params.id
    const show = await Show.findById(id).exec();
    try {       
        const newBooking = req.body
        newBooking.animalShow = show
        newBooking.user = req.user
        await Booking.create(newBooking)
        res.redirect(`/shows/${show._id}`)
    } catch(err) {
        console.log(err)
        res.redirect(`/shows/${show._id}`, { errorMsg: err.message })
    }
}