const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const earningsSchema = new Schema({

    month: String,
    earnings: String,



});


module.exports = mongoose.model('Earnings', earningsSchema)