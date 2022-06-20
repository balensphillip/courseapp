require('dotenv').config();
const express = require('express');
const path = require('path')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const config = require('./config/database');
const logger = require('./logger/logger')

//creating a variable for express(we are instatiating our server).
const app = express();

// index model
const index = require('./models/indexModel');

// creating a connection to the Mongo database from the controller(specifying its location)
mongoose.connect(config.database);

// Instatiation of database connection
const db = mongoose.connection;
//Incase of a connection invoke the function that displays the message below.
db.once('open', ()=>{
  logger.info('Connected to MongoDB');
});
//Or else incase of failure the function below is invoked.
db.on('error', function(err){
  logger.error(err);
});

//bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false}));


app.get('/',(req, res) => {
  res.render('index')
});

//setting up the View engine
app.engine('pug', require('pug').__express)
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//bodyparser middleware section: cleans data in the forms
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

// static files connection
app.use(express.static(path.join(__dirname, 'public')));

// Express Session middleware
app.use(session({
  secret: 'bp',
  resave: true,
  saveUninitialized: true
}));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Passport configuration
require('./config/passport')(passport);

// Passport Middleware
app.use(passport.initialize());
// this handles the session during the usage of resources.
app.use(passport.session());

// this is handling the comparison of the user that is logging in and the system. 
// next() allows execution of the code to continue after comparison.
app.get('*', function(req, res, next){
  res.locals.user = req.user || null;
  next();
});

// route files
let indexfile = require('./routes/indexRoute');
let aboutfile = require('./routes/registerRoute');
let registerfile = require('./routes/aboutRoute');
app.use('/indexRoute', indexfile);
app.use('/registerRoute', registerfile);
app.use('/aboutRoute', aboutfile);

const PORT =  process.env.PORT || 5000;
app.listen(PORT, () => {
    logger.info(`Listening at ${PORT}`);
});

module.exports = app;