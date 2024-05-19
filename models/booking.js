const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    showDate: { 
        type: Date,
        required: true
    },
    numberOfAdults: {
        type: Number,
        required: true
    },
    numberOfChildren: {
        type: Number,
        required: true
    },
    animalShow: {
        type: Schema.Types.ObjectId,
        ref: 'Show',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    }, {
        timestamps: true
    });

module.exports = mongoose.model('Booking', bookingSchema)