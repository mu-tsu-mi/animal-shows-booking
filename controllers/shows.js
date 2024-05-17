const Animal = require('../models/animal');
const Show = require('../models/show')

module.exports = {
    showAnimalShow,
    
}

async function showAnimalShow(req, res) {
    const animalShow = req.params.animalShowName
    const show = await Show.findOne({ name: animalShow}).exec();
    res.render('./animal-zones/animal-show', { show })
}