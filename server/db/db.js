const mongoose = require('mongoose');

const connectToDatabase = () => {
    mongoose.connect(process.env.DB_SECRET_KEY);
}

module.exports = connectToDatabase;