const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    numberOfAdults: Number,
    numberOfChildren: Number,
    animalShow: {
        type: Schema.Types.ObjectId,
        ref: 'Show',
        required: true
    },
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }]
    }, {
        timestamps: true
    });

moddule.exports = mongoose.model('Booking', bookingSchema)