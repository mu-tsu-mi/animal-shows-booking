const Animal = require('../models/animal');

module.exports = {
    show
}

async function show(req, res) {
    // console.log(req.params)
    const zone = req.params.zone
    const animals = await Animal.find({ zone: zone }).exec();
    // console.log(animals)
    // const animals = await Animal.findById(req.params._id)
    res.render('./animal-zones/animals', { animals, zone })
}