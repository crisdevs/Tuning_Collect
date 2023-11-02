const mongoose = require('mongoose');

const tuningSchema = mongoose.Schema({
    name: {type: String, required: true},
    stringNumber: {type: String, required: true},
    tunings: {
        7:{type: String},
        6:{type: String, required: true},
        5:{type: String, required: true},
        4:{type: String, required: true},
        3:{type: String, required: true},
        2:{type: String, required: true},
        1:{type: String, required: true}
    }
});

module.exports = mongoose.model('Tuning', tuningSchema);