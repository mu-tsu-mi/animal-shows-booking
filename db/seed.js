require('dotenv').config();
require('./database');

const Animal = require('../models/animal');
const animalSeedData = require('./seeds-animal.json');
const Show = require('../models/show')
const showSeedData = require('./seeds-show.json');

(async function() {
    await Animal.deleteMany({})
    const animals = await Animal.insertMany(animalSeedData);
    console.log('Inserted animals', animals);

    await Show.deleteMany({})
    const shows = await Show.insertMany(showSeedData);
    console.log('Inserted shows', shows);
    
    process.exit();
})();