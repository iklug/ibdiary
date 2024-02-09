const mongoose = require('mongoose');

const connectToDatabase = () => {
    mongoose.connect(process.env.DB_SECRET_KEY);
    console.log('connection successful');
}

module.exports = connectToDatabase;