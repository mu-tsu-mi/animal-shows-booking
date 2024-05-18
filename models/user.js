const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: String,
    googleId: {
        type: String,
        required: true
    },
    email: String,
    bookingId: [{
        type: Schema.Types.ObjectId,
        ref: 'Booking'
    }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema)