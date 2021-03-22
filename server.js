// server.js
//property of Gardner Gang. #GG
// set up ======================================================================
// get all the tools we need
const express  = require('express');
const bodyParser = require('body-parser')
const app      = express();

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8080;
}
// const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose');
const passport = require('passport');
const flash    = require('connect-flash');

const morgan       = require('morgan');
const cookieParser = require('cookie-parser');
const session      = require('express-session');

const configDB = require('./config/database.js');
const setupRoutes = require('./app/routes.js')

let db

// configuration ===============================================================
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect(configDB.url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, database) => {
  if (err) return console.log(err)
  db = database
  // require('./app/routes.js')(app, passport, db)
  setupRoutes(app, passport, db);
}); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(express.json()); // get information from html forms
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
    secret: 'rcbootcamp2019a', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
