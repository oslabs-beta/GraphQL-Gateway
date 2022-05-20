const mongoose = require('mongoose');

const { Schema } = mongoose;

const querySchema = new Schema({
    text: { type: String, required: true },
    time: { type: Number, required: true },
    complexity: { type: Number, required: true },
});

module.exports = mongoose.model('Query', querySchema, 'queries');
