const express = require('express');
const expressLayouts = require('express-ejs-layouts');
require('dotenv/config');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const fetch = require('node-fetch');

const app = express();
app.set('view engine', 'ejs');

// Passport config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').MongoURI;

// Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

//EJS
app.use('/public', express.static('public'));
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Bodyparser
app.use(express.urlencoded({ extended: false }))

// Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error');
    next();
})

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));



// Floor number without rounding
function getFlooredFixed(v, d) {
    return (Math.floor(v * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d);
}

function getResponse() {


    fetch('http://webtask.future-processing.com:8068/currencies', {
        "Accept": "application/json"
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)

            //Values
            let gbpPrice = JSON.stringify(data.items[5].purchasePrice);
            app.locals.gbpPriceFloor = getFlooredFixed(gbpPrice, 2);

            let eurPrice = JSON.stringify(data.items[1].purchasePrice);
            app.locals.eurPriceFloor = getFlooredFixed(eurPrice, 2);

            let usdPrice = JSON.stringify(data.items[0].purchasePrice);
            app.locals.usdPriceFloor = getFlooredFixed(usdPrice, 2);

            let czkPrice = JSON.stringify(data.items[4].purchasePrice);
            app.locals.czkPriceFloor = getFlooredFixed(czkPrice, 2);

            //Units
            app.locals.gbpUnit = JSON.stringify(data.items[5].unit);

            app.locals.eurUnit = JSON.stringify(data.items[1].unit);

            app.locals.usdUnit = JSON.stringify(data.items[0].unit);

            app.locals.czkUnit = JSON.stringify(data.items[4].unit);

        })
}

getResponse();





