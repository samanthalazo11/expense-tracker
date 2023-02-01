// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const trackerRouter = require('./controllers/tracker');
const methodOverride = require('method-override');

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



// mount routes
app.get('/', (req,res) =>res.render('home.ejs'));
app.use(trackerRouter);






// tell the application to listen
app.listen(PORT, () => {
    console.log(`Express is listening on port; ${PORT}`)
});