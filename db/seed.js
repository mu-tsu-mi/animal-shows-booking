require('dotenv').config();
require('./database');
const mongoose = require('mongoose');


const Booking = require('../models/booking');
const Animal = require('../models/animal');
const animalSeedData = require('./seeds-animal.json');
const Show = require('../models/show')
const showSeedData = require('./seeds-show.json');

(async function() {
    try {
        await Booking.deleteMany({});
        await Animal.deleteMany({});
        const animals = await Animal.insertMany(animalSeedData);

        await Show.deleteMany({})
        const shows = await Show.insertMany(showSeedData);
        
        for (const showSeed of showSeedData) {
            if (showSeed._animal) {
                const animal = await Animal.findOne({name: showSeed._animal}).exec()
                const show = await Show.findOne({name: showSeed.name}).exec()
                show.animal = animal
                await show.save()
            }
        }
    } catch (error) {
        console.error('Error during database seeding:', error);
    } finally {
        await mongoose.connection.close();
    }
})();