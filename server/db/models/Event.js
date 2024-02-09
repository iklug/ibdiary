const {Schema} = require('mongoose');
const mongoose = require('mongoose');

const EventSchema = new Schema({
    title: {
        type: String,
    },
    startTime: {
        type: String,
    },
    endTime: {
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

const shortEventSchema = new Schema({
    title: {
        type: String,
    },
    startTime: {
        type: String,
    },
    endTime: {
        type: String,
    },
});

module.exports.EventSchema = EventSchema;
module.exports.shortEventSchema = shortEventSchema;