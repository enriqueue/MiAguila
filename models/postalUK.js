const mongoose = require('mongoose');

const postalCodeSchema = mongoose.Schema({
    lat: {
        type: String,
        required: [true, 'Lat is required']
    },
    lon: {
        type: String,
        required: [true, 'Lon is required']
    }, 
    postCode: {
        type: String, 
        required: [true, 'Postal Code is required']
    }
});

module.exports = mongoose.model('Codes', postalCodeSchema);