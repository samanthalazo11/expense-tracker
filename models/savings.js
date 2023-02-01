const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const savingsSchema = new Schema({

    month: String,
    savings: String,
    notes: String,



});


module.exports = mongoose.model('Savings', savingsSchema)