const {Schema} = require('mongoose');
const mongoose = require('mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    hash: {
        type: String,
    },
    salt: {
        type: String,
    },
    personal: {
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        preferredName: {
            type: String,
        },
        pronouns: {
            type: String,
        },
        birthday: {
            type: Date,
        }
    },
    medical: {
        diagnosis: {
            type: String,
        },
        yearOfDiagnosis: {
            type: String,
        },
        currentMedication: {
            type: Array,
        },
        pastMedication: {
            type: Array,
        },
        primaryPhysician: {
            type: String,
        },
        primaryGastro: {
            type: String,
        },
        allergies: {
            type: Array,
        }
    },
    preferences: {
        color: {
            type: String,
        },
        darkMode: {
            type: Boolean,
        },
        '24hourClock': {
            type: Boolean,
        }
    }
});

module.exports = mongoose.model('User', UserSchema);