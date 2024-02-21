const {Schema} = require('mongoose');
const mongoose = require('mongoose');
const EventSchema = require('./Event').EventSchema;
const shortEventSchema = require('./Event').shortEventSchema;


const DaySchema = new Schema({
    date: {
        year: Number,
        month: Number,
        day: Number,
    },
    dateString: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    events: [EventSchema],
    food: [shortEventSchema],
    medication: [EventSchema],
    symptoms: [shortEventSchema],
    reflection: {
        body: {
            type: String,
        },
        stress: {
            type: Number,
        },
        emotion: {
            type: String,
        }
    },

});

module.exports = mongoose.model('Day', DaySchema);