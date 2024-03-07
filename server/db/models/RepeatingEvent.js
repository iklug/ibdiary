const {Schema} = require('mongoose');
const mongoose = require('mongoose');


const RepeatingEventSchema = new Schema({
    dates: {
        type: [String],
        required: true,
        default: [],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
    },
    endTime: {
        type: String,
    },
    repeat: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('RepeatingEvent', RepeatingEventSchema);