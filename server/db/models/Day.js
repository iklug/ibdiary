const {Schema} = require('mongoose');
const mongoose = require('mongoose');



const DaySchema = new Schema({
    date: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    events: {
        type: Array,
    },

});

module.exports = mongoose.model('Day', DaySchema);