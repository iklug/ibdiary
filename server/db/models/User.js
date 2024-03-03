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
            default: '',
        },
        lastName: {
            type: String,
            default: '',
        },
        preferredName: {
            type: String,
            default: '',
        },
        gender: {
            type: String,
            default: '',
        },
        pronouns: {
            type: String,
            default: '',
        },
        birthday: {
            type: String,
            default: '',
        }
    },
    medical: {
        diagnosis: {
            type: String,
            default: '',
        },
        yearOfDiagnosis: {
            type: String,
            default: '',
        },
        currentMedication: {
            type: String,
            default: '',
        },
        pastMedication: {
            type: String,
            default: '',
        },
        primaryPhysician: {
            type: String,
            default: '',
        },
        primaryGastro: {
            type: String,
            default: '',
        },
        allergies: {
            type: String,
            default: '',
        }
    },
    preferences: {
        color: {
            type: String,
            default: 'blue',
        },
        darkMode: {
            type: Boolean,
            default: false,
        },
        '24hourClock': {
            type: Boolean,
            default: true,
        }
    }
});

module.exports = mongoose.model('User', UserSchema);