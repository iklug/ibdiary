const crypto = require('crypto');

const generatePassword = (password) => {
    let salt = crypto.randomBytes(32).toString('hex');
    let hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

    return {
        salt,
        hash,
    }
};

const validatePassword = (password, hash, salt) => {
    const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hashVerify === hash;
}

module.exports.validatePassword = validatePassword;
module.exports.generatePassword = generatePassword;