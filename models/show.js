const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const showSchema = new Schema({
    name: String,
    zone: String,
    description: String,
    animal: {
      type: Schema.Types.ObjectId,
      ref: 'Animal'
    }
}, {timestamps: true})

module.exports = mongoose.model('Show', showSchema)