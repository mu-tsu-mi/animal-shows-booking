const Animal = require('../models/animal');
const Show = require('../models/show')

module.exports = {
    show,
    showDetail
}

async function show(req, res) {
    // console.log(req.params)
    const zone = req.params.zone
    const animals = await Animal.find({ zone: zone }).exec();
    // console.log(animals)
    // const animals = await Animal.findById(req.params._id)
    res.render('./animal-zones/zone', { animals, zone })
}

async function showDetail(req, res) {
    const name = req.params.name
    const animal = await Animal.findOne({ name }).exec();
    const shows = await Show.find({ 'animal': animal._id }).exec();
    res.render('./animal-zones/animal', { animal, shows })
}