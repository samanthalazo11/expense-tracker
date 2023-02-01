const express = require('express');
const router = express.Router();
const Expense = require('../models/expenses');
const Earnings = require('../models/earnings');
const Savings = require('../models/savings');



// SEED ROUTES

//INDUCES
//INDEX
router.get('/planner', (req,res) => {
    res.render('tracker_index.ejs');
})
//Expenses
router.get('/expenses', (req,res) =>{
    Expense.find({}, (err, allExpenses) => {
        res.render('index.ejs', {
            expense: allExpenses
        });
    });
});

//Savings
router.get('/savings', (req,res) =>{
    Savings.find({}, (err,allSavings)=>{
        res.render('savings_index.ejs', {
          saving:allSavings
        });
    });
});

//Earnings
router.get('/earnings', (req,res) =>{
    Earnings.find({}, (err,allEarnings)=>{
        res.render('earning_index.ejs', {
            earning:allEarnings
        });
    });
});


//NEW
//Expenses
router.get('/expenses/new', (req,res) => {
    res.render('new.ejs');
});

// Savings
router.get('/savings/new', (req,res)=>{
    res.render('savings_new.ejs');
});

//Earnings
router.get('/earnings/new', (req,res)=>{
    res.render('earning_new.ejs');
});

//Delete
//Expenses
router.delete('/expenses/:id', (req,res)=>{
    Expense.findByIdAndDelete(req.params.id, (err,deletedExpense)=>{
        res.redirect('/expenses');
    });
});

//Savings
router.delete('/savings/:id', (req,res)=>{
    Savings.findByIdAndDelete(req.params.id, (err,deletedSavings)=>{
        res.redirect('/savings')
    })
})

//Earnings
router.delete('/earnings/:id', (req,res)=>{
    Earnings.findByIdAndDelete(req.params.id, (err,deletedEarnings)=>{
        res.redirect('/earnings')
    });
});


//Update
//Expenses
router.put('/expenses/:id', (req,res)=>{
    Expense.findByIdAndUpdate(req.params.id, req.body, (err,expense)=>{
        res.redirect('/expenses');
    });
});
//Savings
router.put('/savings/:id',(req,res)=>{
    Savings.findByIdAndUpdate(req.params.id, req.body, (err,saving)=>{
        res.redirect('/savings');
    });
});

//Earnings
router.put('/earnings/:id', (req,res)=>{
    Earnings.findByIdAndUpdate(req.params.id, req.body, (err,earning)=>{
        res.redirect('/earnings');
    });
});

//Create
//Expenses
router.post('/expenses', (req,res) => {
    Expense.create(req.body,(err, createdExpense) => {
        res.redirect('/expenses');
    });

});

//Savings

router.post('/savings',(req,res)=>{
    Savings.create(req.body,(err, createdSavings)=>{
        res.redirect('/savings');
    });
});
//Earnings

router.post('/earnings', (req,res) =>{
    Earnings.create(req.body,(err, createdEarnings)=>{
        res.redirect('/earnings')
    });
});

//EDIT
//Expenses
router.get('/expenses/:id/edit', (req,res)=>{
    Expense.findById(req.params.id, (err,foundExpense)=>{
        res.render('edit.ejs',{
            expense:foundExpense
        });
    });
});
//Savings
router.get('/savings/:id/edit', (req,res)=>{
    Savings.findById(req.params.id, (err,foundSavings)=>{
        res.render('savings_edit.ejs',{
            saving:foundSavings
        });
    });
});

//Earnings
router.get('/earnings/:id/edit', (req,res)=>{
    Earnings.findById(req.params.id, (err,foundEarnings)=>{
        res.render('earning_edit.ejs', {
            earning:foundEarnings
        });
    });
});

//Show
//Expense
router.get('/expenses/:id', (req,res)=>{
    Expense.findById(req.params.id, (err, foundExpense) => {
        res.render('show.ejs', {
            expense: foundExpense
        });
    });
});

//Savings
router.get('/savings/:id', (req,res)=>{
    Savings.findById(req.params.id, (err,foundSavings)=>{
        res.render('savings_show.ejs',{
            saving: foundSavings
        });
    });
});

//Earnings
router.get('/earnings/:id', (req,res)=>{
    Earnings.findById(req.params.id, (err,foundEarnings)=>{
        res.render('earning_show.ejs',{
          earning: foundEarnings
        })
    });
});

module.exports = router;