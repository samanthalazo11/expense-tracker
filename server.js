// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const trackerRouter = require('./controllers/tracker');
const usersRouter = require('./controllers/users');



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
app.use(methodOverride('_method'));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

//custom middleware to inspect session
// app.use((req, res, next)=>{
//     console.log(req.session)
//     next();
// });

//Authentication Middleware

function isAuthenticated(req,res, next){
    if(!req.session.userId){
        res.locals.user = null;
        return res.redirect('/login');
    }
    res.locals.user = req.session.userId;
    next();

}



// mount routes
app.get('/', (req,res) =>res.render('home.ejs'));

app.use(usersRouter);
app.use(isAuthenticated,trackerRouter);







// tell the application to listen
app.listen(PORT, () => {
    console.log(`Express is listening on port; ${PORT}`)
});