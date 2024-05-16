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
    console.log(req.params.name)
    const animal = req.params.name
    console.log(animal)
    res.render('./animal-zones/animal', { animal })
}