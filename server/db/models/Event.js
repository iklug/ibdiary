const {Schema} = require('mongoose');
const mongoose = require('mongoose');

const EventSchema = new Schema({
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
        default: 'undefined',
    },
    day: {
        type: Schema.Types.ObjectId,
        required: true,
    }  
});

// const shortEventSchema = new Schema({
//     title: {
//         type: String,
//         required: true,
//     },
//     startTime: {
//         type: String,
//     },
//     endTime: {
//         type: String,
//     },
// });

// module.exports.EventSchema = EventSchema;
// module.exports.shortEventSchema = shortEventSchema;

module.exports = mongoose.model('Event', EventSchema);