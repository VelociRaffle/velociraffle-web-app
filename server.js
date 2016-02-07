var express = require('express');
var app     = express();
var path    = require('path');
var bodyParser = require('body-parser');
var morgan  = require('morgan');
var favicon = require('serve-favicon');
var config  = require('./config');
var mailerRoutes;

// Necessary for parsing the body of POST reqs
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Needed to easily log requests
app.use(morgan('dev'));

app.set('views', path.join(__dirname, 'dist'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/dist'));
app.use(favicon(path.join(__dirname, 'favicon.ico')));

app.get('/', function(req, res) {
  res.render('index', {
    title: '',
    env: process.env.NODE_ENV
  });
});

// CATCH-ALL ROUTE ----------------------
app.get('*', function(req, res) {
  res.render('index');
});

app.listen(config.port);
console.log('Server is running on port: ' + config.port);
