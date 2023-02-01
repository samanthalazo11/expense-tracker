const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema({

    name: String,
    budget: String,
    spent: String,
    notes:String,


});


module.exports = mongoose.model('Expense', expenseSchema, 'Budget')
