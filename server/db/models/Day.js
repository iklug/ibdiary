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
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    events: [EventSchema],
    repeatingEvents: {
        type: [{type: Schema.Types.ObjectId, ref: 'RepeatingEvent'}],
        default: [],
    },
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