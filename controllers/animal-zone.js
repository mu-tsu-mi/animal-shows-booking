const Animal = require('../models/animal');
const Show = require('../models/show')

module.exports = {
    show
}

async function show(req, res) {
    const zone = req.params.zone
    const animals = await Animal.find({ zone: zone }).exec();
    res.render('./animal-zones/zone', { animals, zone })
}