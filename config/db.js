const mongoose = require('mongoose');
require('dotenv').config();

const connectionDB = async() => {
    try {
        mongoose.connect( process.env.MONGO_CNN );
        console.log('DATABASE ON');
    } catch (error) {
        throw new Error;
        console.log(error);
    }
}

module.exports = connectionDB;