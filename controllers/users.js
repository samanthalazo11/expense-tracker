const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');


//Sign Up
router.get('/signup', (req,res) =>{
    res.render('signup.ejs')
});

router.post('/signup', (req,res)=>{
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;
    User.create(req.body, (err, newUser) =>{
        res.redirect('/planner');
    })

});
// Log in

router.get('/login', (req,res) =>{
    res.render('login.ejs');
});

router.post('/login', (req,res)=>{
    User.findOne({email: req.body.email},(err,foundUser)=>{
        if(!foundUser){
            return res. redirect('/login');
        }

        const isMatched = bcrypt.compareSync(req.body.password, foundUser.password)

        if(!isMatched){
            return res.redirect('/login');
        }
        req.session.userId = foundUser._id
        res.redirect('/planner')
    });

});

// Log Out

router.get('/logout', (req, res)=>{
    req.session.destroy((err)=>{
        res.redirect('/login')
    })
})
module.exports = router;