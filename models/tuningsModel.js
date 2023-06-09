const mongoose = require('mongoose');

const tuningSchema = mongoose.Schema({
    name: {type: String, required: true},
    stringNumber: {type: String, required: true},
    tunings: {type:[String], required: true}
});

module.exports = mongoose.model('Tuning', tuningSchema);