const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: String,
    emailAddress: String,
    bookingId: [{
        type: Schema.Types.ObjectId,
        ref: 'Booking'
    }]
}, { timestamps: true });