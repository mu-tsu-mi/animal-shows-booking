require('dotenv').config();
require('./database');

const Animal = require('../models/animal');
const animalSeedData = require('./seeds-animal.json');

Animal.deleteMany({})
	.then(() => {
		return Animal.insertMany(animalSeedData);
	})
	.then((animals) => {
		console.log('Inserted animals', animals);
	})
	.catch(console.error)
	.finally(() => process.exit());