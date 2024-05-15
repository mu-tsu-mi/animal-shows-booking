require('dotenv').config();
require('./database');

const Animal = require('../models/animal');
const animalSeedData = require('./seeds-animal.json');
const Show = require('../models/show')
const showSeedData = require('./seeds-show.json');

Animal.deleteMany({})
	.then(() => {
		return Animal.insertMany(animalSeedData);
	})
	.then((animals) => {
		console.log('Inserted animals', animals);
	})
	.catch(console.error)
	.finally(() => process.exit());

Show.deleteMany({})
    .then(() => {
        return Show.insertMany(showSeedData);
    })
    .then((shows) => {
        console.log('Inserted shows: ', shows)
    })
    .catch(console.error)
    .finally(() => process.exit());