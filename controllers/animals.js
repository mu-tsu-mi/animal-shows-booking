const Animal = require('../models/animal');
const Show = require('../models/show')

module.exports = {
    showDetail
}

async function showDetail(req, res) {
    const id = req.params.id
    const animal = await Animal.findById(id).exec();
    const shows = await Show.find({animal}).exec();
    res.render('./animal-zones/animal', { animal, shows })
}