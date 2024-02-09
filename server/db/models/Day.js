const {Schema} = require('mongoose');
const mongoose = require('mongoose');


const EventSchema = new Schema({
    startTime: {
        type: String,
    },
    endTime: {
        type: String,
    },
    title: {
        type: String,
    },
    recurring: {
        type: Boolean,
        default: false,
    },
    recursEvery: {
        type: Number,
        default: null,
    }, 
});

const DaySchema = new Schema({
    date: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    events: [EventSchema],
    food: [EventSchema],
    medication: [EventSchema],
    symptoms: [EventSchema],
    reflection: {
        type: String,
    },

});

module.exports = mongoose.model('Day', DaySchema);