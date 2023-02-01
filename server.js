// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const Expense = require('./models/expenses');
const Earnings = require('./models/earnings');
const Savings = require('./models/savings');

// Initialize application
const app = express();

// Configure Settings
require('dotenv').config()
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;


// Establish Connection to mongodb
mongoose.set('strictQuery', false);
mongoose.connect(DATABASE_URL);

const db = mongoose.connection;

db.on('connected', () =>{
    console.log('Connected to mongodb');
});

db.on('error', (error)=>{
    console.log('An error has occured in mongodb' + error.message);
});

// mount middleware
app.use(express.urlencoded({extended:false}));

// mount routes

// SEED ROUTES

//INDUCES
//INDEX
app.get('/planner', (req,res) => {
    res.render('tracker_index.ejs');
})
//Expenses
app.get('/expenses', (req,res) =>{
    Expense.find({}, (err, allExpenses) => {
        res.render('index.ejs', {
            expense: allExpenses
        });
    });
});

//Savings
app.get('/savings', (req,res) =>{
    Savings.find({}, (err,allSavings)=>{
        res.render('savings_index.ejs', {
          saving:allSavings
        });
    });
});

//Earnings
app.get('/earnings', (req,res) =>{
    Earnings.find({}, (err,allEarnings)=>{
        res.render('earning_index.ejs', {
            earning:allEarnings
        });
    });
});


//NEW
//Expenses
app.get('/expenses/new', (req,res) => {
    res.render('new.ejs');
});

// Savings
app.get('/savings/new', (req,res)=>{
    res.render('savings_new.ejs');
});

//Earnings
app.get('/earnings/new', (req,res)=>{
    res.render('earning_new.ejs');
});

//Delete

//Update

//Create
//Expenses
app.post('/expenses', (req,res) => {
    Expense.create(req.body,(err, createdExpense) => {
        res.redirect('/expenses');
    });

});

//Savings

app.post('/savings',(req,res)=>{
    Savings.create(req.body,(err, createdSavings)=>{
        res.redirect('/savings');
    });
});
//Earnings

app.post('/earnings', (req,res) =>{
    Earnings.create(req.body,(err, createdEarnings)=>{
        res.redirect('/earnings')
    });
});

//EDIT

//Show
//Expense
app.get('/expenses/:id', (req,res)=>{
    Expense.findById(req.params.id, (err, foundExpense) => {
        res.render('show.ejs', {
            expense: foundExpense
        });
    });
});

//Savings
app.get('/savings/:id', (req,res)=>{
    Savings.findById(req.params.id, (err,foundSavings)=>{
        res.render('savings_show.ejs',{
            saving: foundSavings
        });
    });
});

//Earnings
app.get('/earnings/:id', (req,res)=>{
    Earnings.findById(req.params.id, (err,foundEarnings)=>{
        res.render('earning_show.ejs',{
          earning: foundEarnings
        })
    });
});


// tell the application to listen
app.listen(PORT, () => {
    console.log(`Express is listening on port; ${PORT}`)
});