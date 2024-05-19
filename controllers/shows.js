const Show = require('../models/show')
const Booking = require('../models/booking')

module.exports = {
    showAnimalShow,
    bookAnimalShow
}

async function showAnimalShow(req, res) {
    const animalShow = req.params.animalShowName
    const show = await Show.findOne({ name: animalShow}).populate('animal').exec();
    res.render('./animal-zones/animal-show', { show })
}

async function bookAnimalShow(req, res) {
    const animalShow = req.params.animalShowName
    const show = await Show.findOne({ name: animalShow}).populate('animal').exec();
    try {
        const newBooking = req.body
        newBooking.animalShow = show
        newBooking.user = req.user
        await Booking.create(newBooking)
        res.redirect(`/zones/${show.zone}/${show.animal.name}/${show.name}`)
    } catch(err) {
        console.log(err)
        res.redirect(`/zones/${show.zone}/${show.animal.name}/${show.name}`, { errorMsg: err.message })
    }
}