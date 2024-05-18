const Animal = require('../models/animal');
const Show = require('../models/show')

module.exports = {
    showAnimalShow,
    book
}

async function showAnimalShow(req, res) {
    const animalShow = req.params.animalShowName
    const show = await Show.findOne({ name: animalShow}).exec();
    res.render('./animal-zones/animal-show', { show })
}

async function book(req, res) {

    try {
        console.log(req.body)
        await Show.create(req.body)
        res.redirect('/zones/:zone/:name/:animalShowName')
    } catch(err) {
        console.log(err)
        res.render('/zones/:zone/:name/:animalShowName', { errorMsg: err.message })
    }
}