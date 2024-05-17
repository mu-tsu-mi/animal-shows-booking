const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const animalSchema = new Schema({
    name: String,
    // animalImage: [{ img: {type: String}}],
    zone: String
}, {timestamps: true})

module.exports = mongoose.model('Animal', animalSchema)