const {Schema} = require('mongoose');
const mongoose = require('mongoose');
const EventSchema = require('./Event').EventSchema;
const shortEventSchema = require('./Event').shortEventSchema;


const DaySchema = new Schema({
    date: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    events: [EventSchema],
    reflection: {
        body: {
            type: String,
            default: '',
        },
        stress: {
            type: Number,
            default: null,
        },
        emotion: {
            type: String,
            default: '',
        },
        edited: {
            type: Boolean,
            defaulted: false,
        }
    },

});

module.exports = mongoose.model('Day', DaySchema);